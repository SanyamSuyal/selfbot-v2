export default {
  name: 'ascii',
  description: 'Generate ASCII art from text',
  category: 'fun',
  aliases: ['art', 'text', 'banner'],
  cooldown: 3,
  usage: 'ascii <text>',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide text to convert to ASCII art.\n**Example:** `!ascii Hello World`');
    }

    const text = args.join(' ');
    
    if (text.length > 20) {
      return message.channel.send('❌ Text is too long. Maximum 20 characters allowed.');
    }

    // Simple ASCII art patterns for letters (basic implementation)
    const asciiPatterns = {
      'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
      'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
      'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
      'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
      'E': ['█████', '█    ', '███  ', '█    ', '█████'],
      'F': ['█████', '█    ', '███  ', '█    ', '█    '],
      'G': [' ████', '█    ', '█ ███', '█   █', ' ████'],
      'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
      'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
      'J': ['█████', '    █', '    █', '█   █', ' ████'],
      'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
      'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
      'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
      'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
      'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
      'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
      'Q': [' ███ ', '█   █', '█ █ █', '█  ██', ' ██ █'],
      'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
      'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
      'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
      'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
      'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
      'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
      'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
      'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
      'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '!': ['  █  ', '  █  ', '  █  ', '     ', '  █  '],
      '?': [' ███ ', '█   █', '   █ ', '  █  ', '  █  ']
    };

    try {
      const lines = ['', '', '', '', ''];
      
      for (let char of text.toUpperCase()) {
        if (asciiPatterns[char]) {
          for (let i = 0; i < 5; i++) {
            lines[i] += asciiPatterns[char][i] + ' ';
          }
        } else {
          // Unknown character, use space
          for (let i = 0; i < 5; i++) {
            lines[i] += '     ';
          }
        }
      }

      const asciiArt = lines.join('\n');
      
      if (asciiArt.length > 1900) {
        return message.channel.send('❌ Generated ASCII art is too large to display.');
      }

      const embed = {
        title: '🎨 ASCII Art',
        description: `\`\`\`\n${asciiArt}\n\`\`\``,
        color: 0x00ff00,
        timestamp: new Date(),
        footer: {
          text: `Generated for: "${text}" | Requested by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send('❌ Failed to generate ASCII art. Please try with shorter text.');
    }
  }
};
