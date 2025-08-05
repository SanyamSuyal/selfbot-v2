export default {
  name: 'embedtest',
  description: 'Test basic embed functionality',
  category: 'utility',
  aliases: ['et'],
  cooldown: 2,
  usage: 'embedtest',

  async execute(client, message, args) {
    // Test multiple approaches
    console.log('Testing embed approaches...');
    
    try {
      // Approach 1: Just embeds
      console.log('Trying approach 1: just embeds');
      await message.channel.send({
        embeds: [{
          title: '✅ Test 1: Just Embeds',
          description: 'This should work!',
          color: 0x00ff00
        }]
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Approach 2: With visible content
      console.log('Trying approach 2: with content');
      await message.channel.send({
        content: 'Test 2:',
        embeds: [{
          title: '✅ Test 2: With Content',
          description: 'This should also work!',
          color: 0x0099ff
        }]
      });
      
    } catch (error) {
      console.error('All embed approaches failed:', error);
      await message.channel.send(`❌ **Embed Test Failed**\n\`\`\`\n${error.message}\n\`\`\`\n\n**Bot Info:**\n• Commands: ${client.commands.size}\n• Guilds: ${client.guilds.cache.size}\n• Library: discord.js-selfbot-v13\n• Status: ${client.user.presence?.status || 'unknown'}`);
    }
  }
};
