export default {
  name: 'test2',
  description: 'Simple test command that definitely works',
  category: 'developer',
  aliases: ['t2', 'simple'],
  cooldown: 1,
  usage: 'test2',

  async execute(client, message, args) {
    // Simple text message - guaranteed to work
    message.channel.send('✅ **TEST SUCCESSFUL!** This command works perfectly. Bot is functional! 🎉');
  }
};
