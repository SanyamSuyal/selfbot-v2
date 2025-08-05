export default {
  name: 'serverinfo',
  description: 'Get detailed information about the current server',
  category: 'utility',
  aliases: ['si', 'server', 'guild', 'guildinfo'],
  cooldown: 3,
  usage: 'serverinfo',

  async execute(client, message, args) {
    if (!message.guild) {
      return message.channel.send('❌ This command can only be used in a server.');
    }

    const guild = message.guild;
    
    // Fetch additional guild data
    try {
      await guild.fetch();
    } catch (error) {
      // Continue with cached data if fetch fails
    }

    const owner = await guild.fetchOwner().catch(() => null);
    const members = guild.members.cache;
    const channels = guild.channels.cache;
    
    const onlineMembers = members.filter(member => member.presence?.status !== 'offline').size;
    const textChannels = channels.filter(channel => channel.type === 0).size;
    const voiceChannels = channels.filter(channel => channel.type === 2).size;
    const categories = channels.filter(channel => channel.type === 4).size;
    
    const verificationLevels = {
      0: 'None',
      1: 'Low',
      2: 'Medium', 
      3: 'High',
      4: 'Very High'
    };

    const boostTiers = {
      0: 'No Tier',
      1: 'Tier 1',
      2: 'Tier 2',
      3: 'Tier 3'
    };

    const embed = {
      title: `🏰 ${guild.name}`,
      thumbnail: {
        url: guild.iconURL({ dynamic: true, size: 512 }) || null
      },
      fields: [
        {
          name: '🆔 Server ID',
          value: guild.id,
          inline: true
        },
        {
          name: '👑 Owner',
          value: owner ? owner.user.tag : 'Unknown',
          inline: true
        },
        {
          name: '📅 Created',
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: '👥 Members',
          value: `${guild.memberCount} total\n${onlineMembers} online`,
          inline: true
        },
        {
          name: '📝 Channels',
          value: `${textChannels} Text\n${voiceChannels} Voice\n${categories} Categories`,
          inline: true
        },
        {
          name: '🎭 Roles',
          value: guild.roles.cache.size.toString(),
          inline: true
        },
        {
          name: '😀 Emojis',
          value: guild.emojis.cache.size.toString(),
          inline: true
        },
        {
          name: '🔒 Verification Level',
          value: verificationLevels[guild.verificationLevel] || 'Unknown',
          inline: true
        },
        {
          name: '💎 Boost Status',
          value: `${boostTiers[guild.premiumTier]}\n${guild.premiumSubscriptionCount || 0} boosts`,
          inline: true
        }
      ],
      color: 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: `Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL()
      }
    };

    if (guild.description) {
      embed.description = guild.description;
    }

    if (guild.bannerURL()) {
      embed.image = {
        url: guild.bannerURL({ dynamic: true, size: 1024 })
      };
    }

    message.channel.send({ content: ' ', embeds: [embed] });
  }
};
