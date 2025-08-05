import { EmbedBuilder, Colors, sendEmbed } from '../../utils/embedBuilder.js';

export default {
  name: 'serverinfo',
  description: 'Get detailed server information with professional formatting',
  category: 'utility',
  aliases: ['si', 'server', 'guildinfo'],
  cooldown: 5,
  usage: 'serverinfo',

  async execute(client, message, args) {
    if (!message.guild) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('❌ Server Only Command')
        .setDescription('This command can only be used in a server!')
        .setColor(Colors.ERROR)
        .setTimestamp()
        .build();
      
      return sendEmbed(message.channel, errorEmbed);
    }

    const guild = message.guild;
    
    // Fetch guild data
    await guild.fetch();
    const owner = await guild.fetchOwner().catch(() => null);
    
    // Calculate server age
    const serverAge = Math.floor((Date.now() - guild.createdTimestamp) / (1000 * 60 * 60 * 24));
    
    // Get verification level
    const verificationLevels = {
      0: 'None',
      1: 'Low',
      2: 'Medium', 
      3: 'High',
      4: 'Very High'
    };
    
    // Get boost info
    const boostTier = guild.premiumTier;
    const boostCount = guild.premiumSubscriptionCount || 0;
    
    const embed = new EmbedBuilder()
      .setTitle(`🏰 ${guild.name}`)
      .setDescription(`**Server Information & Statistics**`)
      .setColor(Colors.DISCORD_BLURPLE)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addField('🆔 Server ID', guild.id, true)
      .addField('👑 Owner', owner ? owner.user.tag : 'Unknown', true)
      .addField('📅 Created', `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, true)
      .addField('⏰ Server Age', `${serverAge} days`, true)
      .addField('🔐 Verification', verificationLevels[guild.verificationLevel], true)
      .addField('🌍 Region', guild.preferredLocale || 'Unknown', true)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .build();

    // Member statistics
    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(member => 
      member.presence?.status === 'online' || 
      member.presence?.status === 'idle' || 
      member.presence?.status === 'dnd'
    ).size;
    
    embed.fields.push({
      name: '👥 Members',
      value: `**Total:** ${totalMembers}\n**Online:** ${onlineMembers}`,
      inline: true
    });

    // Channel statistics
    const textChannels = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size;
    const voiceChannels = guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size;
    const categories = guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size;
    
    embed.fields.push({
      name: '📡 Channels',
      value: `**Text:** ${textChannels}\n**Voice:** ${voiceChannels}\n**Categories:** ${categories}`,
      inline: true
    });

    // Boost information
    const boostEmojis = ['', '🚀', '🚀🚀', '🚀🚀🚀'];
    embed.fields.push({
      name: '💎 Boost Status',
      value: `**Tier:** ${boostTier} ${boostEmojis[boostTier]}\n**Boosts:** ${boostCount}`,
      inline: true
    });

    // Role count
    const roleCount = guild.roles.cache.size - 1; // Exclude @everyone
    embed.fields.push({
      name: '🎭 Roles',
      value: `${roleCount} roles`,
      inline: true
    });

    // Emoji count
    const emojiCount = guild.emojis.cache.size;
    const animatedEmojis = guild.emojis.cache.filter(emoji => emoji.animated).size;
    embed.fields.push({
      name: '😀 Emojis',
      value: `**Total:** ${emojiCount}\n**Animated:** ${animatedEmojis}`,
      inline: true
    });

    // Features
    const features = guild.features;
    if (features.length > 0) {
      const featureMap = {
        'VANITY_URL': '🔗 Vanity URL',
        'INVITE_SPLASH': '🎨 Invite Splash',
        'VIP_REGIONS': '🌟 VIP Regions',
        'VERIFIED': '✅ Verified',
        'PARTNERED': '🤝 Partnered',
        'COMMUNITY': '🏘️ Community',
        'NEWS': '📰 News Channels',
        'DISCOVERABLE': '🔍 Discoverable',
        'FEATURABLE': '⭐ Featurable',
        'ANIMATED_ICON': '🎭 Animated Icon',
        'BANNER': '🖼️ Banner',
        'WELCOME_SCREEN_ENABLED': '👋 Welcome Screen',
        'MEMBER_VERIFICATION_GATE_ENABLED': '🚪 Member Screening',
        'PREVIEW_ENABLED': '👁️ Preview Enabled'
      };
      
      const displayFeatures = features
        .map(feature => featureMap[feature] || feature)
        .slice(0, 10)
        .join('\n');
      
      embed.fields.push({
        name: '✨ Server Features',
        value: displayFeatures || 'None',
        inline: false
      });
    }

    // Add banner if available
    if (guild.bannerURL()) {
      embed.image = {
        url: guild.bannerURL({ dynamic: true, size: 1024 })
      };
    }

    await sendEmbed(message.channel, embed);
  }
};
