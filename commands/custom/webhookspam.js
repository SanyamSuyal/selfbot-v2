export default {
  name: 'webhookspam',
  description: 'Test webhook spam functionality (testing only)',
  category: 'custom',
  aliases: ['wbspam', 'webhooktest'],
  cooldown: 30,
  usage: 'webhookspam <webhook_url> <message> [count]',

  async execute(client, message, args) {
    // Owner-only for security
    if (message.author.id !== process.env.OWNER_ID) {
      return message.channel.send('❌ This command is restricted to the bot owner for security reasons.');
    }

    if (args.length < 2) {
      return message.channel.send('❌ Please provide webhook URL and message.\n**Usage:** `!webhookspam <webhook_url> <message> [count]`\n**⚠️ Use responsibly and only for testing!**');
    }

    const webhookUrl = args[0];
    const count = Math.min(parseInt(args[args.length - 1]) || 1, 5); // Limit to 5 for safety
    const messageContent = args.slice(1, isNaN(args[args.length - 1]) ? args.length : -1).join(' ');

    // Validate webhook URL
    if (!webhookUrl.includes('discord.com/api/webhooks/')) {
      return message.channel.send('❌ Invalid webhook URL format.');
    }

    if (!messageContent.trim()) {
      return message.channel.send('❌ Message content cannot be empty.');
    }

    const warningEmbed = {
      title: '⚠️ Webhook Spam Test Warning',
      description: 'This feature is for testing purposes only!\nWebhook spam can result in rate limits and potential account issues.',
      fields: [
        {
          name: '🎯 Target',
          value: `Webhook URL: ||${webhookUrl}||`,
          inline: false
        },
        {
          name: '📝 Message',
          value: messageContent,
          inline: false
        },
        {
          name: '🔢 Count',
          value: count.toString(),
          inline: true
        }
      ],
      color: 0xff0000,
      timestamp: new Date()
    };

    const confirmMsg = await message.channel.send({ 
      content: '⚠️ **CONFIRM WEBHOOK TEST**\nReact with ✅ to proceed or ❌ to cancel (30s timeout)',
      embeds: [warningEmbed] 
    });

    try {
      await confirmMsg.react('✅');
      await confirmMsg.react('❌');

      const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      const collected = await confirmMsg.awaitReactions({ 
        filter, 
        max: 1, 
        time: 30000, 
        errors: ['time'] 
      });

      const reaction = collected.first();

      if (reaction.emoji.name === '❌') {
        return confirmMsg.edit({ content: '❌ Webhook test cancelled.', embeds: [] });
      }

      if (reaction.emoji.name === '✅') {
        confirmMsg.edit({ content: '🔄 Executing webhook test...', embeds: [] });

        let successful = 0;
        let failed = 0;

        try {
          const fetch = (await import('node-fetch')).default;
          
          for (let i = 0; i < count; i++) {
            try {
              const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  content: `${messageContent} (Test ${i + 1}/${count})`,
                  username: 'Selfbot Test',
                  avatar_url: client.user.displayAvatarURL()
                })
              });

              if (response.ok) {
                successful++;
              } else {
                failed++;
              }

              // Rate limit delay
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              failed++;
            }
          }

          const resultEmbed = {
            title: '📊 Webhook Test Results',
            fields: [
              {
                name: '✅ Successful',
                value: successful.toString(),
                inline: true
              },
              {
                name: '❌ Failed',
                value: failed.toString(),
                inline: true
              },
              {
                name: '📊 Total',
                value: count.toString(),
                inline: true
              }
            ],
            color: successful > failed ? 0x00ff00 : 0xff0000,
            timestamp: new Date(),
            footer: {
              text: '⚠️ Use webhook testing responsibly'
            }
          };

          confirmMsg.edit({ content: '', embeds: [resultEmbed] });

        } catch (error) {
          confirmMsg.edit({ content: '❌ Webhook test failed. Check the URL and try again.', embeds: [] });
        }
      }

    } catch (error) {
      confirmMsg.edit({ content: '⏰ Webhook test timed out.', embeds: [] });
    }
  }
};
