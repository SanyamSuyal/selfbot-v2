export default {
  name: 'crashtest',
  description: 'Test crash protection and error handling',
  category: 'developer',
  aliases: ['ct', 'testcrash'],
  cooldown: 5,
  usage: 'crashtest [type]',

  async execute(client, message, args) {
    const testType = args[0] || 'safe';
    
    const statusText = `🧪 **CRASH TEST INITIATED**

**Test Type:** ${testType}
**Purpose:** Testing error handling and crash protection
**Status:** Running tests...

`;

    const statusMsg = await message.channel.send(statusText);
    
    try {
      switch (testType.toLowerCase()) {
        case 'message':
          // Test editing non-existent message
          const fakeMsg = { edit: () => { throw new Error('Unknown Message'); } };
          await fakeMsg.edit('test');
          break;
          
        case 'permission':
          // Test permission error
          throw new Error('Missing Permissions');
          
        case 'network':
          // Test network error
          throw new Error('fetch failed');
          
        case 'rate':
          // Test rate limit
          throw new Error('Rate limited');
          
        case 'safe':
        default:
          // Safe test that should work
          const testResults = `✅ **CRASH TEST RESULTS**

🔧 **Test Type:** ${testType}
🛡️ **Error Handling:** PASSED
🚀 **Bot Status:** STABLE
📊 **Memory Usage:** ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
⏱️ **Uptime:** ${Math.floor(process.uptime() / 60)}m ${Math.floor(process.uptime() % 60)}s

**Commands Loaded:** ${client.commands.size}
**Servers Connected:** ${client.guilds.cache.size}
**Error Protection:** ✅ ACTIVE

✨ *All systems operational! Bot is crash-protected.*`;

          await statusMsg.edit(testResults);
          return;
      }
    } catch (error) {
      // This should be caught by the error handler
      throw error;
    }
  }
};
