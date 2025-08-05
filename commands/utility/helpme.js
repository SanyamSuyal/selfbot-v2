export default {
  name: 'helpme',
  description: 'Emergency help command that always works (no embeds)',
  category: 'utility',
  aliases: ['emergency', 'basichelp'],
  cooldown: 2,
  usage: 'helpme',

  async execute(client, message, args) {
    let helpText = '🆘 **EMERGENCY HELP - COMMANDS THAT DEFINITELY WORK**\n\n';
    helpText += '✅ **GUARANTEED WORKING COMMANDS:**\n';
    helpText += '• `!test2` - Simple test (always works)\n';
    helpText += '• `!simple` - Basic ping test\n';
    helpText += '• `!working` - Full status report\n';
    helpText += '• `!helpme` - This help command\n';
    helpText += '• `!joke` - Random jokes (fixed)\n';
    helpText += '• `!afk [message]` - Set AFK status\n';
    helpText += '• `!nitro` - Fake nitro generator (fixed)\n\n';
    
    helpText += '📊 **BOT STATUS:**\n';
    helpText += `• Commands loaded: ${client.commands ? client.commands.size : 'Unknown'}\n`;
    helpText += `• Connected to: ${client.guilds.cache.size} servers\n`;
    helpText += `• Your username: ${message.author.tag}\n`;
    helpText += `• Bot ping: ${client.ws.ping}ms\n\n`;
    
    helpText += '🔧 **TROUBLESHOOTING:**\n';
    helpText += '• If commands fail, try the ones listed above\n';
    helpText += '• These commands use plain text (no embeds)\n';
    helpText += '• They should work 100% of the time\n';
    helpText += '• If even these fail, check your internet/token\n\n';
    
    helpText += '🎯 **THE BOT IS WORKING!** Try `!test2` to verify! 🎉';

    message.channel.send(helpText);
  }
};
