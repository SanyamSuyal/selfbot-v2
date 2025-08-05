export default {
  name: 'test',
  description: 'Test command to verify embed sending works',
  category: 'developer',
  aliases: ['t'],
  cooldown: 1,
  usage: 'test',

  async execute(client, message, args) {
    const embed = {
      title: '✅ Test Command',
      description: 'This embed should send successfully!',
      color: 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: `Test by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL()
      }
    };

    try {
      // Using the fixed format with content field
      await message.channel.send({ content: ' ', embeds: [embed] });
      console.log('✅ Embed sent successfully');
    } catch (error) {
      console.error('❌ Embed send failed:', error.message);
      // Fallback to plain text
      message.channel.send('✅ Test command works! (Fallback to text mode)');
    }
  }
};
