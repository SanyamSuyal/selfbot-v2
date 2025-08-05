import { EmbedBuilder, Colors, sendEmbed } from '../../utils/embedBuilder.js';

export default {
  name: 'userinfo',
  description: 'Get detailed information about a user with professional formatting',
  category: 'utility',
  aliases: ['ui', 'user', 'whois'],
  cooldown: 3,
  usage: 'userinfo [@user]',

  async execute(client, message, args) {
    let user;
    
    if (args[0]) {
      const mention = args[0].replace(/[<@!>]/g, '');
      user = await client.users.fetch(mention).catch(() => null);
      
      if (!user) {
        const errorEmbed = new EmbedBuilder()
          .setTitle('❌ User Not Found')
          .setDescription('Could not find the specified user.')
          .setColor(Colors.ERROR)
          .setTimestamp()
          .build();
        
        return sendEmbed(message.channel, errorEmbed);
      }
    } else {
      user = message.author;
    }

    const member = message.guild?.members.cache.get(user.id);
    
    // Calculate account age
    const accountAge = Math.floor((Date.now() - user.createdTimestamp) / (1000 * 60 * 60 * 24));
    
    const embed = new EmbedBuilder()
      .setTitle(`👤 User Information`)
      .setDescription(`**${user.tag}**`)
      .setColor(member?.displayHexColor || Colors.DISCORD_BLURPLE)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
      .addField('🆔 User ID', user.id, true)
      .addField('📅 Created', `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, true)
      .addField('⏰ Account Age', `${accountAge} days`, true)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .build();

    // Add server-specific information if in a guild
    if (member && message.guild) {
      const joinAge = Math.floor((Date.now() - member.joinedTimestamp) / (1000 * 60 * 60 * 24));
      
      embed.fields.push(
        {
          name: '🚪 Joined Server',
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
          inline: true
        },
        {
          name: '📆 Member For',
          value: `${joinAge} days`,
          inline: true
        },
        {
          name: '📱 Status',
          value: member.presence?.status ? 
            `${member.presence.status.charAt(0).toUpperCase() + member.presence.status.slice(1)}` : 
            'Unknown',
          inline: true
        }
      );

      // Add roles if any
      if (member.roles.cache.size > 1) {
        const roles = member.roles.cache
          .filter(role => role.id !== message.guild.id)
          .sort((a, b) => b.position - a.position)
          .map(role => role.toString())
          .slice(0, 10);
        
        embed.fields.push({
          name: `🎭 Roles (${member.roles.cache.size - 1})`,
          value: roles.length > 0 ? roles.join(' ') : 'None',
          inline: false
        });
        
        if (member.roles.cache.size > 11) {
          embed.fields[embed.fields.length - 1].value += ` *+${member.roles.cache.size - 11} more*`;
        }
      }

      // Add permissions
      if (member.permissions.has('ADMINISTRATOR')) {
        embed.fields.push({
          name: '🔐 Key Permissions',
          value: '👑 Administrator',
          inline: true
        });
      } else {
        const keyPerms = [];
        if (member.permissions.has('MANAGE_GUILD')) keyPerms.push('Manage Server');
        if (member.permissions.has('MANAGE_CHANNELS')) keyPerms.push('Manage Channels');
        if (member.permissions.has('MANAGE_MESSAGES')) keyPerms.push('Manage Messages');
        if (member.permissions.has('KICK_MEMBERS')) keyPerms.push('Kick Members');
        if (member.permissions.has('BAN_MEMBERS')) keyPerms.push('Ban Members');
        
        if (keyPerms.length > 0) {
          embed.fields.push({
            name: '🔐 Key Permissions',
            value: keyPerms.join(', '),
            inline: false
          });
        }
      }
    }

    // Add badges/flags
    const flags = user.flags?.toArray() || [];
    if (flags.length > 0) {
      const badgeEmojis = {
        'Staff': '🛡️',
        'Partner': '🤝',
        'Hypesquad': '🎉',
        'BugHunterLevel1': '🐛',
        'BugHunterLevel2': '🐛',
        'HypesquadOnlineHouse1': '⚡', // Bravery
        'HypesquadOnlineHouse2': '💎', // Brilliance  
        'HypesquadOnlineHouse3': '🌟', // Balance
        'PremiumEarlySupporter': '💎',
        'VerifiedDeveloper': '🔧'
      };
      
      const badges = flags.map(flag => badgeEmojis[flag] || flag).join(' ');
      embed.fields.push({
        name: '🏆 Badges',
        value: badges,
        inline: false
      });
    }

    await sendEmbed(message.channel, embed);
  }
};
