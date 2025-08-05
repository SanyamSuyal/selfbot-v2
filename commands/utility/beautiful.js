export default {
  name: 'beautiful',
  description: 'Beautiful professional help command that actually works',
  category: 'utility',
  aliases: ['b', 'pretty'],
  cooldown: 3,
  usage: 'beautiful',

  async execute(client, message, args) {
    const categories = client.categories;
    
    let helpText = `📚 **COMMAND CENTER**
*Professional Discord Selfbot - Premium Experience*

`;

    // Add category sections
    const categoryEmojis = {
      utility: '⚙️',
      fun: '🎉', 
      tools: '🔧',
      social: '👥',
      developer: '💻',
      custom: '🎨'
    };

    categories.forEach((commands, categoryName) => {
      if (commands.length === 0) return;
      
      const emoji = categoryEmojis[categoryName] || '📁';
      helpText += `${emoji} **${categoryName.toUpperCase()}** (${commands.length} commands)\n`;
      
      // Show first 8 commands per category
      const displayCommands = commands.slice(0, 8).map(cmd => `\`${cmd.name}\``).join(' • ');
      helpText += `${displayCommands}`;
      
      if (commands.length > 8) {
        helpText += ` *+${commands.length - 8} more*`;
      }
      
      helpText += '\n\n';
    });

    helpText += `💡 **HOW TO USE**
• \`${process.env.PREFIX}help <command>\` - Detailed command info  
• \`${process.env.PREFIX}beautiful\` - This professional display  
• \`${process.env.PREFIX}fix\` - System status & performance  

📊 **STATISTICS**
Total Commands: **${client.commands.size}**  
Connected Servers: **${client.guilds.cache.size}**  
Cached Users: **${client.users.cache.size}**  
Bot Prefix: **${process.env.PREFIX}**  

🎯 **STATUS: All systems operational!**`;

    await message.channel.send(helpText);
  }
};
