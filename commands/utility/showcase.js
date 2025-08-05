import { EmbedBuilder, Colors, sendEmbed } from '../../utils/embedBuilder.js';

export default {
  name: 'showcase',
  description: 'Showcase the professional embed system capabilities',
  category: 'utility',
  aliases: ['demo', 'features', 'premium'],
  cooldown: 5,
  usage: 'showcase',

  async execute(client, message, args) {
    // Main showcase embed
    const showcase = new EmbedBuilder()
      .setTitle('🎨 Professional Embed System')
      .setDescription('**Welcome to the next-level Discord selfbot experience!**\n\n*This showcase demonstrates our premium embed system with professional styling, rich formatting, and beautiful presentation.*')
      .setColor(Colors.DISCORD_BLURPLE)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .addField('⚡ Core Features', '• Beautiful embedded messages\n• Professional color schemes\n• Rich media support\n• Smart fallback system\n• Responsive design', true)
      .addField('🎯 Categories', '• Utility Commands\n• Fun & Entertainment\n• Developer Tools\n• Social Features\n• Custom Commands\n• Moderation Tools', true)
      .addField('🔥 Professional Benefits', '• Eye-catching presentation\n• Organized information\n• Brand consistency\n• Enhanced readability\n• Premium appearance', false)
      .setImage('https://cdn.discordapp.com/attachments/123456789/example.png') // Placeholder
      .setTimestamp()
      .setFooter(`Premium Selfbot Experience | ${client.commands.size} Commands Available`, client.user.displayAvatarURL())
      .build();

    await sendEmbed(message.channel, showcase);

    // Wait a moment then send color palette demo
    setTimeout(async () => {
      const colorDemo = new EmbedBuilder()
        .setTitle('🎨 Color Palette Showcase')
        .setDescription('**Professional color schemes for every occasion**')
        .setColor(Colors.PRIMARY)
        .addField('🟦 Primary', 'Main brand color for general use', true)
        .addField('🟢 Success', 'Positive actions and confirmations', true)
        .addField('🔴 Error', 'Warnings and error messages', true)
        .addField('🟡 Warning', 'Caution and important notices', true) 
        .addField('🟣 Purple', 'Special features and premium content', true)
        .addField('ℹ️ Info', 'Informational messages and tips', true)
        .addField('🏆 Gold', 'Premium features and achievements', false)
        .setTimestamp()
        .build();

      await sendEmbed(message.channel, colorDemo);
    }, 2000);

    // Statistics embed
    setTimeout(async () => {
      const stats = new EmbedBuilder()
        .setTitle('📊 System Statistics')
        .setDescription('**Current bot performance and capabilities**')
        .setColor(Colors.SUCCESS)
        .addField('🤖 Bot Status', '✅ Online & Operational', true)
        .addField('📡 Servers', `${client.guilds.cache.size} connected`, true)
        .addField('👥 Users Reached', `${client.users.cache.size} users`, true)
        .addField('⚡ Commands', `${client.commands.size} loaded`, true)
        .addField('🚀 Uptime', `${Math.floor(process.uptime() / 60)} minutes`, true)
        .addField('💾 Memory', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
        .addField('🌟 Features', '• Professional embeds\n• Smart error handling\n• Cooldown management\n• Category organization\n• Alias support\n• Auto-reactions', false)
        .setTimestamp()
        .setFooter('System running optimally', client.user.displayAvatarURL())
        .build();

      await sendEmbed(message.channel, stats);
    }, 4000);

    // Feature comparison
    setTimeout(async () => {
      const comparison = new EmbedBuilder()
        .setTitle('⚡ Before vs After')
        .setDescription('**See the difference our professional system makes**')
        .setColor(Colors.GOLD)
        .addField('❌ Old System', '• Plain text messages\n• No visual appeal\n• Basic functionality\n• Limited formatting\n• Generic appearance', true)
        .addField('✅ New Professional System', '• Beautiful embedded messages\n• Rich visual presentation\n• Advanced features\n• Professional formatting\n• Premium branding', true)
        .addField('🎯 The Result', 'Transform your Discord presence from basic to professional with stunning visual design that captures attention and delivers information beautifully.', false)
        .setTimestamp()
        .setFooter('Upgrade your Discord game', client.user.displayAvatarURL())
        .build();

      await sendEmbed(message.channel, comparison);
    }, 6000);
  }
};
