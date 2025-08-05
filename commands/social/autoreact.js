export default {
  name: 'autoreact',
  description: 'Automatically react to messages with specified emojis',
  category: 'social',
  aliases: ['areact', 'autoemo'],
  cooldown: 3,
  usage: 'autoreact <enable|disable|add|remove|list> [emoji]',

  async execute(client, message, args) {
    if (!args[0]) {
      return message.channel.send('❌ Please specify an action.\n**Usage:** `!autoreact enable|disable|add|remove|list [emoji]`');
    }

    const action = args[0].toLowerCase();

    if (!client.autoReact) {
      client.autoReact = {
        enabled: false,
        emojis: ['👍', '❤️'],
        channels: new Set(),
        probability: 0.3 // 30% chance to react
      };
    }

    switch (action) {
      case 'enable':
        client.autoReact.enabled = true;
        client.autoReact.channels.add(message.channel.id);
        
        message.channel.send(`✅ Auto-react enabled in this channel\n🎯 Emojis: ${client.autoReact.emojis.join(' ')}\n📊 Probability: ${Math.round(client.autoReact.probability * 100)}%`);
        break;

      case 'disable':
        client.autoReact.channels.delete(message.channel.id);
        
        if (client.autoReact.channels.size === 0) {
          client.autoReact.enabled = false;
        }
        
        message.channel.send('❌ Auto-react disabled in this channel');
        break;

      case 'add':
        if (!args[1]) {
          return message.channel.send('❌ Please provide an emoji to add.\n**Example:** `!autoreact add 🔥`');
        }
        
        const emojiToAdd = args[1];
        if (client.autoReact.emojis.includes(emojiToAdd)) {
          return message.channel.send('❌ This emoji is already in the auto-react list.');
        }
        
        if (client.autoReact.emojis.length >= 10) {
          return message.channel.send('❌ Maximum of 10 emojis allowed.');
        }
        
        client.autoReact.emojis.push(emojiToAdd);
        message.channel.send(`✅ Added ${emojiToAdd} to auto-react list\n🎯 Current emojis: ${client.autoReact.emojis.join(' ')}`);
        break;

      case 'remove':
        if (!args[1]) {
          return message.channel.send('❌ Please provide an emoji to remove.\n**Example:** `!autoreact remove 👍`');
        }
        
        const emojiToRemove = args[1];
        const index = client.autoReact.emojis.indexOf(emojiToRemove);
        
        if (index === -1) {
          return message.channel.send('❌ This emoji is not in the auto-react list.');
        }
        
        client.autoReact.emojis.splice(index, 1);
        message.channel.send(`✅ Removed ${emojiToRemove} from auto-react list\n🎯 Current emojis: ${client.autoReact.emojis.join(' ') || 'None'}`);
        break;

      case 'list':
        const activeChannels = Array.from(client.autoReact.channels).map(id => {
          const channel = client.channels.cache.get(id);
          return channel ? `#${channel.name}` : 'Unknown Channel';
        });

        const embed = {
          title: '🎭 Auto-React Status',
          fields: [
            {
              name: '🔘 Status',
              value: client.autoReact.enabled ? '✅ Enabled' : '❌ Disabled',
              inline: true
            },
            {
              name: '📊 Probability',
              value: `${Math.round(client.autoReact.probability * 100)}%`,
              inline: true
            },
            {
              name: '🎯 Emojis',
              value: client.autoReact.emojis.join(' ') || 'None',
              inline: false
            },
            {
              name: '📍 Active Channels',
              value: activeChannels.length > 0 ? activeChannels.join('\n') : 'None',
              inline: false
            }
          ],
          color: client.autoReact.enabled ? 0x00ff00 : 0xff0000,
          timestamp: new Date()
        };

        message.channel.send({ embeds: [embed] });
        break;

      case 'prob':
      case 'probability':
        if (!args[1] || isNaN(args[1])) {
          return message.channel.send('❌ Please provide a valid probability (0-100).\n**Example:** `!autoreact prob 50`');
        }
        
        const prob = Math.max(0, Math.min(100, parseInt(args[1]))) / 100;
        client.autoReact.probability = prob;
        
        message.channel.send(`✅ Auto-react probability set to ${Math.round(prob * 100)}%`);
        break;

      default:
        message.channel.send('❌ Invalid action. Use: `enable`, `disable`, `add`, `remove`, `list`, or `prob`');
    }
  }
};
