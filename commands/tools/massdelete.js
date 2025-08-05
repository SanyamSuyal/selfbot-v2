export default {
  name: 'massdelete',
  description: 'Mass delete your own messages in the current channel',
  category: 'tools',
  aliases: ['purge', 'clear', 'deletemessages'],
  cooldown: 10,
  usage: 'massdelete <amount>',

  async execute(client, message, args) {
    if (!args[0] || isNaN(args[0])) {
      return message.channel.send('❌ **Invalid Number** - Please provide a valid number of messages to delete.\n**Example:** `!massdelete 50`');
    }

    const amount = parseInt(args[0]);
    
    if (amount < 1 || amount > 100) {
      return message.channel.send('❌ **Invalid Range** - Please provide a number between 1 and 100.');
    }

    let statusMsg;
    try {
      statusMsg = await message.channel.send(`🗑️ **Starting mass delete...**\nTarget: ${amount} messages`);
    } catch (error) {
      return; // Can't even send status message, give up
    }
    
    try {
      // Fetch messages
      const messages = await message.channel.messages.fetch({ limit: 100 });
      const userMessages = messages.filter(msg => msg.author.id === client.user.id && msg.id !== statusMsg.id);
      
      if (userMessages.size === 0) {
        const noMsgsText = '❌ **No Messages Found** - No messages found to delete in this channel.';
        try {
          await statusMsg.edit(noMsgsText);
        } catch {
          await message.channel.send(noMsgsText);
        }
        return;
      }

      const toDelete = Array.from(userMessages.values()).slice(0, amount);
      let deleted = 0;
      let failed = 0;

      // Delete messages one by one with better error handling
      for (let i = 0; i < toDelete.length; i++) {
        const msg = toDelete[i];
        try {
          await msg.delete();
          deleted++;
          
          // Update status every 5 deletions (safer)
          if (deleted % 5 === 0) {
            const progress = `🗑️ **Deleting Messages...**\nProgress: ${deleted}/${toDelete.length}\nDeleted: ✅ ${deleted} | Failed: ❌ ${failed}`;
            try {
              await statusMsg.edit(progress);
            } catch {
              // Status message might be deleted, ignore
            }
          }
          
          // Rate limit delay (safer)
          await new Promise(resolve => setTimeout(resolve, 750));
        } catch (error) {
          failed++;
          if (error.code === 10008) {
            // Message already deleted, continue
            continue;
          }
          if (error.code === 50013) {
            // Missing permissions, stop
            break;
          }
          // Other errors, just continue
        }
      }

      const resultText = `🗑️ **Mass Delete Complete**

✅ **Successfully Deleted:** ${deleted}
❌ **Failed:** ${failed}  
📊 **Total Attempted:** ${toDelete.length}
⏱️ **Time:** ${new Date().toLocaleTimeString()}

${deleted > 0 ? '✨ Operation completed successfully!' : '⚠️ No messages were deleted.'}`;

      try {
        await statusMsg.edit(resultText);
        
        // Auto-delete status message after 15 seconds
        setTimeout(() => {
          statusMsg.delete().catch(() => {});
        }, 15000);
      } catch {
        // If status message is gone, send new one
        try {
          const newMsg = await message.channel.send(resultText);
          setTimeout(() => {
            newMsg.delete().catch(() => {});
          }, 15000);
        } catch {
          // Give up gracefully
        }
      }

    } catch (error) {
      const errorText = `❌ **Mass Delete Failed**

**Error:** ${error.message || 'Unknown error'}
**Possible causes:**
• Missing permissions
• Messages too old (14+ days)
• Rate limit reached
• Network issues

Try with a smaller number or check permissions.`;

      try {
        await statusMsg.edit(errorText);
      } catch {
        try {
          await message.channel.send(errorText);
        } catch {
          // Complete failure, nothing we can do
        }
      }
    }
  }
};
