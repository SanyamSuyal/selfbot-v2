export default {
  name: 'autodm',
  description: 'Automatically send DM to users who join the server',
  category: 'social',
  aliases: ['autopm', 'welcomedm'],
  cooldown: 5,
  usage: 'autodm <enable|disable|set> [message]',

  async execute(client, message, args) {
    if (!args[0]) {
      return message.channel.send('❌ Please specify an action.\n**Usage:** `!autodm enable|disable|set <message>`');
    }

    const action = args[0].toLowerCase();

    if (!client.autoDM) {
      client.autoDM = {
        enabled: false,
        message: 'Welcome to the server! 🎉',
        guilds: new Set()
      };
    }

    switch (action) {
      case 'enable':
        if (!message.guild) {
          return message.channel.send('❌ This command must be used in a server.');
        }
        
        client.autoDM.enabled = true;
        client.autoDM.guilds.add(message.guild.id);
        
        message.channel.send(`✅ Auto-DM enabled for **${message.guild.name}**\n📝 Message: "${client.autoDM.message}"`);
        break;

      case 'disable':
        if (!message.guild) {
          return message.channel.send('❌ This command must be used in a server.');
        }
        
        client.autoDM.guilds.delete(message.guild.id);
        
        if (client.autoDM.guilds.size === 0) {
          client.autoDM.enabled = false;
        }
        
        message.channel.send(`❌ Auto-DM disabled for **${message.guild.name}**`);
        break;

      case 'set':
        if (!args[1]) {
          return message.channel.send('❌ Please provide a message.\n**Example:** `!autodm set Welcome to our server!`');
        }
        
        const newMessage = args.slice(1).join(' ');
        if (newMessage.length > 500) {
          return message.channel.send('❌ Message is too long. Maximum 500 characters.');
        }
        
        client.autoDM.message = newMessage;
        message.channel.send(`✅ Auto-DM message updated:\n📝 "${newMessage}"`);
        break;

      case 'status':
        const enabledGuilds = Array.from(client.autoDM.guilds).map(id => {
          const guild = client.guilds.cache.get(id);
          return guild ? guild.name : 'Unknown Server';
        });

        const embed = {
          title: '📧 Auto-DM Status',
          fields: [
            {
              name: '🔘 Status',
              value: client.autoDM.enabled ? '✅ Enabled' : '❌ Disabled',
              inline: true
            },
            {
              name: '📊 Active Servers',
              value: enabledGuilds.length > 0 ? enabledGuilds.join('\n') : 'None',
              inline: true
            },
            {
              name: '📝 Current Message',
              value: client.autoDM.message,
              inline: false
            }
          ],
          color: client.autoDM.enabled ? 0x00ff00 : 0xff0000,
          timestamp: new Date()
        };

        message.channel.send({ embeds: [embed] });
        break;

      default:
        message.channel.send('❌ Invalid action. Use: `enable`, `disable`, `set`, or `status`');
    }
  }
};
