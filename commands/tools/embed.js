export default {
  name: 'embed',
  description: 'Create and send custom embeds',
  category: 'tools',
  aliases: ['createembed', 'cembed'],
  cooldown: 3,
  usage: 'embed <title> | <description> | <color> | <footer>',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide embed content.\n**Format:** `!embed Title | Description | #color | Footer text`\n**Example:** `!embed My Title | This is the description | #ff0000 | Footer text`');
    }

    const content = args.join(' ');
    const parts = content.split(' | ');
    
    if (parts.length < 2) {
      return message.channel.send('❌ Invalid format. Use: `Title | Description | Color | Footer`\nMinimum: `Title | Description`');
    }

    const title = parts[0]?.trim();
    const description = parts[1]?.trim();
    const colorInput = parts[2]?.trim();
    const footer = parts[3]?.trim();

    if (!title || !description) {
      return message.channel.send('❌ Title and description are required.');
    }

    // Parse color
    let color = 0x00ff00; // Default green
    if (colorInput) {
      if (colorInput.startsWith('#')) {
        const hex = colorInput.slice(1);
        if (/^[0-9A-F]{6}$/i.test(hex)) {
          color = parseInt(hex, 16);
        }
      } else {
        // Named colors
        const namedColors = {
          'red': 0xff0000,
          'green': 0x00ff00,
          'blue': 0x0000ff,
          'yellow': 0xffff00,
          'purple': 0x800080,
          'orange': 0xffa500,
          'pink': 0xffc0cb,
          'black': 0x000000,
          'white': 0xffffff,
          'gray': 0x808080,
          'discord': 0x5865f2
        };
        color = namedColors[colorInput.toLowerCase()] || color;
      }
    }

    const embed = {
      title: title,
      description: description,
      color: color,
      timestamp: new Date()
    };

    if (footer) {
      embed.footer = {
        text: footer,
        icon_url: message.author.displayAvatarURL()
      };
    }

    try {
      await message.channel.send({ embeds: [embed] });
      
      // Delete the command message
      setTimeout(() => {
        message.delete().catch(() => {});
      }, 1000);
    } catch (error) {
      message.channel.send('❌ Failed to send embed. Please check your input and try again.');
    }
  }
};
