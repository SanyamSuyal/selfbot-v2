export default {
  name: 'help',
  description: 'Display all available commands with working formatting',
  category: 'utility',
  aliases: ['h', 'commands'],
  cooldown: 3,
  usage: 'help [command]',

  async execute(client, message, args) {
    if (args[0]) {
      // Show specific command help
      const commandName = args[0].toLowerCase();
      const command = client.commands.get(commandName) || client.commands.get(client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))?.name);
      
      if (!command) {
        return message.channel.send(`❌ **Command Not Found** - \`${commandName}\` doesn't exist.`);
      }

      const helpText = `📋 **COMMAND: ${command.name.toUpperCase()}**

📝 **Description**
${command.description || 'No description available'}

📂 **Category:** ${command.category || 'Unknown'}
⏱️ **Cooldown:** ${command.cooldown || 2}s
📝 **Usage:** \`${message.content.split(' ')[0].charAt(0)}${command.usage || command.name}\`
${command.aliases && command.aliases.length > 0 ? `🏷️ **Aliases:** ${command.aliases.map(alias => `\`${alias}\``).join(', ')}` : ''}

✨ *Requested by ${message.author.tag}*`;

      return message.channel.send(helpText);
    }

    // Show all commands by category
    const categories = client.categories;
    
    let helpText = `📚 **COMMAND CENTER**
*Professional Discord Selfbot - All Commands*

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
      helpText += `${emoji} **${categoryName.toUpperCase()}** (${commands.length})\n`;
      
      const commandList = commands.slice(0, 8).map(cmd => `\`${cmd.name}\``).join(' • ');
      helpText += `${commandList}`;
      
      if (commands.length > 8) {
        helpText += ` *+${commands.length - 8} more*`;
      }
      
      helpText += '\n\n';
    });

    helpText += `💡 **USAGE GUIDE**
• \`${process.env.PREFIX}help <command>\` - Get detailed command info
• \`${process.env.PREFIX}working\` - Test bot functionality  
• \`${process.env.PREFIX}fix\` - System status display

📊 **STATISTICS**
**Total Commands:** ${client.commands.size}
**Bot Prefix:** ${process.env.PREFIX}
**Status:** ✅ Online & Ready

🎯 **All systems operational!**`;

    await message.channel.send(helpText);
  }
};
