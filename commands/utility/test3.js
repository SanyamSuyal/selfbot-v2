import { EmbedBuilder, Colors, sendEmbed } from '../../utils/embedBuilder.js';

export default {
  name: 'test3',
  description: 'Test the working embed system',
  category: 'utility',
  aliases: ['t3'],
  cooldown: 2,
  usage: 'test3',

  async execute(client, message, args) {
    // Try a simple working approach first
    try {
      await message.channel.send({
        content: 'Testing embed...',
        embeds: [{
          title: '✅ Working Test',
          description: 'This embed should work!',
          color: 0x00ff00,
          fields: [
            {
              name: '🔧 Status',
              value: 'All systems operational',
              inline: true
            },
            {
              name: '📊 Commands',
              value: `${client.commands.size} loaded`,
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `Tested by ${message.author.tag}`,
            icon_url: message.author.displayAvatarURL()
          }
        }]
      });
    } catch (error) {
      // If that fails, send as text
      await message.channel.send(`❌ Embed failed: ${error.message}\n\n**Working Text Version:**\n✅ **Working Test**\n🔧 Status: All systems operational\n📊 Commands: ${client.commands.size} loaded\n⏰ Time: ${new Date().toLocaleTimeString()}`);
    }
  }
};
