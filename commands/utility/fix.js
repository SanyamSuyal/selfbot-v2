export default {
  name: 'fix',
  description: 'Fixed working command with beautiful formatting',
  category: 'utility',
  aliases: ['f'],
  cooldown: 2,
  usage: 'fix',

  async execute(client, message, args) {
    // Use the exact same format as your working commands
    const helpText = `🎨 **Professional Discord Selfbot**

⚙️ **SYSTEM STATUS**
✅ Status: Online & Operational  
🤖 Commands: ${client.commands.size} loaded  
🌐 Servers: ${client.guilds.cache.size} connected  
👥 Users: ${client.users.cache.size} cached  
⏰ Uptime: ${Math.floor(process.uptime() / 60)} minutes  

🚀 **FEATURES**
• Beautiful text formatting  
• Professional presentation  
• Rich information display  
• Smart error handling  
• Category organization  
• Command aliases support  

💡 **USAGE**
• Use \`${process.env.PREFIX}help\` for command list
• Use \`${process.env.PREFIX}working\` to test functionality  
• Use \`${process.env.PREFIX}fix\` for this status display

📊 **PERFORMANCE**
Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB  
Ping: ${Date.now() - message.createdTimestamp}ms  
Node.js: ${process.version}  

🎯 **Your selfbot is running perfectly with professional formatting!**`;

    await message.channel.send(helpText);
  }
};
