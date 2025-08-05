export default {
  name: 'serverinfo',
  description: 'Get detailed server information',
  category: 'utility',
  aliases: ['si', 'server', 'guildinfo'],
  cooldown: 5,
  usage: 'serverinfo',

  async execute(client, message, args) {
    if (!message.guild) {
      return message.channel.send('❌ **Server Only Command** - This command can only be used in a server!');
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
    
    let serverText = `🏰 **SERVER INFORMATION**

**${guild.name}**
*Server Statistics & Details*

🆔 **SERVER ID**
${guild.id}

👑 **OWNER**
${owner ? owner.user.tag : 'Unknown'}

📅 **CREATED**
${guild.createdAt.toLocaleDateString()} (${serverAge} days ago)

🔐 **VERIFICATION LEVEL**
${verificationLevels[guild.verificationLevel]}

`;

    // Member statistics
    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(member => 
      member.presence?.status === 'online' || 
      member.presence?.status === 'idle' || 
      member.presence?.status === 'dnd'
    ).size;
    
    serverText += `👥 **MEMBERS**
Total: ${totalMembers}
Online: ${onlineMembers}

`;

    // Channel statistics
    const textChannels = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size;
    const voiceChannels = guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size;
    const categories = guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size;
    
    serverText += `📡 **CHANNELS**
Text: ${textChannels}
Voice: ${voiceChannels}
Categories: ${categories}

`;

    // Boost information
    const boostTier = guild.premiumTier;
    const boostCount = guild.premiumSubscriptionCount || 0;
    const boostEmojis = ['', '🚀', '🚀🚀', '🚀🚀🚀'];
    
    serverText += `💎 **BOOST STATUS**
Tier: ${boostTier} ${boostEmojis[boostTier]}
Boosts: ${boostCount}

`;

    // Other stats
    const roleCount = guild.roles.cache.size - 1; // Exclude @everyone
    const emojiCount = guild.emojis.cache.size;
    const animatedEmojis = guild.emojis.cache.filter(emoji => emoji.animated).size;
    
    serverText += `🎭 **OTHER STATS**
Roles: ${roleCount}
Emojis: ${emojiCount} (${animatedEmojis} animated)

`;

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
        'ANIMATED_ICON': '🎭 Animated Icon',
        'BANNER': '🖼️ Banner',
        'WELCOME_SCREEN_ENABLED': '👋 Welcome Screen'
      };
      
      const displayFeatures = features
        .map(feature => featureMap[feature] || feature)
        .slice(0, 8)
        .join('\n');
      
      serverText += `✨ **SERVER FEATURES**
${displayFeatures}

`;
    }

    serverText += `🖼️ **SERVER ICON**
${guild.iconURL({ dynamic: true, size: 256 })}

✨ *Information requested by ${message.author.tag}*`;

    await message.channel.send(serverText);
  }
};
