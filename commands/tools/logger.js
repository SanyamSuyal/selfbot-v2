export default {
  name: 'logger',
  description: 'Log messages from a channel to console',
  category: 'tools',
  aliases: ['log', 'monitor'],
  cooldown: 5,
  usage: 'logger <start|stop> [channel]',

  async execute(client, message, args) {
    if (!args[0]) {
      return message.channel.send('❌ Please specify `start` or `stop`.\n**Example:** `!logger start` or `!logger stop #general`');
    }

    const action = args[0].toLowerCase();
    let targetChannel = message.channel;

    if (args[1]) {
      const channelMention = args[1].replace(/[<#>]/g, '');
      targetChannel = message.guild?.channels.cache.get(channelMention) || message.channel;
    }

    if (!client.loggedChannels) {
      client.loggedChannels = new Set();
    }

    if (action === 'start') {
      if (client.loggedChannels.has(targetChannel.id)) {
        return message.channel.send(`❌ Already logging messages from ${targetChannel.name || 'this channel'}.`);
      }

      client.loggedChannels.add(targetChannel.id);
      
      const embed = {
        title: '📝 Message Logger Started',
        description: `Now logging messages from ${targetChannel.name || 'this channel'}`,
        fields: [
          {
            name: '📍 Channel',
            value: targetChannel.toString(),
            inline: true
          },
          {
            name: '🆔 Channel ID',
            value: targetChannel.id,
            inline: true
          }
        ],
        color: 0x00ff00,
        timestamp: new Date()
      };

      message.channel.send({ embeds: [embed] });

    } else if (action === 'stop') {
      if (!client.loggedChannels.has(targetChannel.id)) {
        return message.channel.send(`❌ Not currently logging messages from ${targetChannel.name || 'this channel'}.`);
      }

      client.loggedChannels.delete(targetChannel.id);
      
      const embed = {
        title: '📝 Message Logger Stopped',
        description: `Stopped logging messages from ${targetChannel.name || 'this channel'}`,
        color: 0xff0000,
        timestamp: new Date()
      };

      message.channel.send({ embeds: [embed] });

    } else {
      message.channel.send('❌ Invalid action. Use `start` or `stop`.');
    }
  }
};
