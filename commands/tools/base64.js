export default {
  name: 'base64',
  description: 'Encode or decode base64 text',
  category: 'tools',
  aliases: ['b64'],
  cooldown: 2,
  usage: 'base64 <encode|decode> <text>',

  async execute(client, message, args) {
    if (args.length < 2) {
      return message.channel.send('❌ Please provide action and text.\n**Usage:** `!base64 encode Hello World` or `!base64 decode SGVsbG8gV29ybGQ=`');
    }

    const action = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    if (!['encode', 'decode'].includes(action)) {
      return message.channel.send('❌ Invalid action. Use `encode` or `decode`.');
    }

    try {
      let result;
      if (action === 'encode') {
        result = Buffer.from(text, 'utf8').toString('base64');
      } else {
        result = Buffer.from(text, 'base64').toString('utf8');
      }

      const embed = {
        title: `🔐 Base64 ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        fields: [
          {
            name: '📥 Input',
            value: `\`${text}\``,
            inline: false
          },
          {
            name: '📤 Output',
            value: `\`${result}\``,
            inline: false
          }
        ],
        color: 0x00ff00,
        timestamp: new Date()
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send('❌ Failed to process text. Please check your input.');
    }
  }
};
