export default {
  name: 'eval',
  description: 'Execute JavaScript code (Owner only)',
  category: 'developer',
  aliases: ['exec', 'js'],
  cooldown: 1,
  usage: 'eval <code>',

  async execute(client, message, args) {
    // Owner-only check
    if (message.author.id !== process.env.OWNER_ID) {
      return message.channel.send('❌ This command is restricted to the bot owner.');
    }

    if (!args.length) {
      return message.channel.send('❌ Please provide JavaScript code to execute.\n**Example:** `!eval console.log("Hello World")`');
    }

    const code = args.join(' ');

    try {
      // Clean the code
      let evaled = eval(code);

      // Handle promises
      if (evaled instanceof Promise) {
        evaled = await evaled;
      }

      // Convert to string for display
      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled, { depth: 0, showHidden: false });
      }

      // Truncate if too long
      if (evaled.length > 1900) {
        evaled = evaled.substring(0, 1900) + '...';
      }

      const embed = {
        title: '📝 Code Evaluation',
        fields: [
          {
            name: '📥 Input',
            value: `\`\`\`javascript\n${code.length > 1000 ? code.substring(0, 1000) + '...' : code}\n\`\`\``,
            inline: false
          },
          {
            name: '📤 Output',
            value: `\`\`\`javascript\n${evaled}\n\`\`\``,
            inline: false
          },
          {
            name: '📊 Type',
            value: typeof evaled,
            inline: true
          }
        ],
        color: 0x00ff00,
        timestamp: new Date(),
        footer: {
          text: `Executed by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      };

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      const embed = {
        title: '❌ Evaluation Error',
        fields: [
          {
            name: '📥 Input',
            value: `\`\`\`javascript\n${code.length > 1000 ? code.substring(0, 1000) + '...' : code}\n\`\`\``,
            inline: false
          },
          {
            name: '❌ Error',
            value: `\`\`\`javascript\n${error.message}\n\`\`\``,
            inline: false
          }
        ],
        color: 0xff0000,
        timestamp: new Date()
      };

      message.channel.send({ embeds: [embed] });
    }
  }
};
