export default {
  name: 'calc',
  description: 'Perform mathematical calculations',
  category: 'utility',
  aliases: ['calculate', 'math'],
  cooldown: 2,
  usage: 'calc <expression>',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide a mathematical expression to calculate.\n**Example:** `!calc 2 + 2 * 3`');
    }

    const expression = args.join(' ');
    
    // Security: Remove dangerous characters and functions
    const sanitized = expression
      .replace(/[^0-9+\-*/.() ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!sanitized) {
      return message.channel.send('❌ Invalid expression. Only numbers and basic operators (+, -, *, /, parentheses) are allowed.');
    }

    try {
      // Use Function constructor for safer evaluation
      const result = Function(`"use strict"; return (${sanitized})`)();
      
      if (!isFinite(result)) {
        return message.channel.send('❌ Result is not a finite number. Please check your expression.');
      }

      const embed = {
        title: '🧮 Calculator',
        fields: [
          {
            name: '📝 Expression',
            value: `\`${expression}\``,
            inline: false
          },
          {
            name: '🎯 Result',
            value: `\`${result}\``,
            inline: false
          }
        ],
        color: 0x00ff00,
        timestamp: new Date(),
        footer: {
          text: `Calculated by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      };

      message.channel.send({ content: ' ', embeds: [embed] });
    } catch (error) {
      message.channel.send('❌ Invalid mathematical expression. Please check your syntax.\n**Example:** `!calc (5 + 3) * 2 / 4`');
    }
  }
};
