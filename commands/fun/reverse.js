export default {
  name: 'reverse',
  description: 'Reverse text or find reverse text',
  category: 'fun',
  aliases: ['rev'],
  cooldown: 2,
  usage: 'reverse <text>',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide text to reverse.\n**Example:** `!reverse Hello World`');
    }

    const text = args.join(' ');
    const reversed = text.split('').reverse().join('');

    const embed = {
      title: '🔄 Text Reverser',
      fields: [
        {
          name: '📝 Original',
          value: `\`${text}\``,
          inline: false
        },
        {
          name: '🔄 Reversed',
          value: `\`${reversed}\``,
          inline: false
        }
      ],
      color: 0x00ff00,
      timestamp: new Date()
    };

    message.channel.send({ embeds: [embed] });
  }
};
