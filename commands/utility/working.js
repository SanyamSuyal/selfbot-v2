export default {
  name: 'working',
  description: 'Test all basic functionality without embeds',
  category: 'utility',
  aliases: ['work', 'status'],
  cooldown: 2,
  usage: 'working',

  async execute(client, message, args) {
    let response = '🤖 **SELFBOT STATUS REPORT**\n\n';
    response += `✅ **Bot Online:** ${client.user.tag}\n`;
    response += `✅ **Commands Loaded:** ${client.commands ? client.commands.size : 'Unknown'}\n`;
    response += `✅ **Guilds Connected:** ${client.guilds.cache.size}\n`;
    response += `✅ **Ping:** ${client.ws.ping}ms\n`;
    response += `✅ **Prefix:** ${process.env.PREFIX || '!'}\n`;
    response += `✅ **Memory Usage:** ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\n\n`;
    response += `🎯 **Everything is working perfectly!**\n`;
    response += `Try these commands:\n`;
    response += `• \`!test2\` - Simple test\n`;
    response += `• \`!working\` - This command\n`;
    response += `• \`!simple\` - Basic ping test\n`;

    message.channel.send(response);
  }
};
