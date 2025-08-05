export default {
  name: 'userinfo',
  description: 'Get detailed information about a user',
  category: 'utility',
  aliases: ['ui', 'user', 'whois'],
  cooldown: 3,
  usage: 'userinfo [@user]',

  async execute(client, message, args) {
    let user;
    
    if (args[0]) {
      // Try to find user by mention, ID, or username
      const mention = args[0].replace(/[<@!>]/g, '');
      user = client.users.cache.get(mention) || 
             client.users.cache.find(u => u.username.toLowerCase().includes(args.join(' ').toLowerCase())) ||
             client.users.cache.find(u => u.tag.toLowerCase().includes(args.join(' ').toLowerCase()));
    } else {
      user = message.author;
    }

    if (!user) {
      return message.channel.send('❌ User not found. Please mention a user or provide a valid user ID.');
    }

    const member = message.guild?.members.cache.get(user.id);
    
    const embed = {
      title: `👤 User Information - ${user.tag}`,
      thumbnail: {
        url: user.displayAvatarURL({ dynamic: true, size: 512 })
      },
      fields: [
        {
          name: '🆔 User ID',
          value: user.id,
          inline: true
        },
        {
          name: '📅 Account Created',
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: '🤖 Bot',
          value: user.bot ? 'Yes' : 'No',
          inline: true
        }
      ],
      color: member?.displayHexColor || 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: `Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL()
      }
    };

    if (member) {
      embed.fields.push(
        {
          name: '📝 Nickname',
          value: member.nickname || 'None',
          inline: true
        },
        {
          name: '📅 Joined Server',
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: '🎭 Roles',
          value: member.roles.cache.size > 1 
            ? member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.toString()).slice(0, 10).join(', ')
            : 'None',
          inline: false
        },
        {
          name: '🔑 Permissions',
          value: member.permissions.has('Administrator') ? 'Administrator' : 
                 member.permissions.has('ManageGuild') ? 'Server Manager' :
                 member.permissions.has('ManageMessages') ? 'Message Manager' : 'Member',
          inline: true
        }
      );

      if (member.premiumSince) {
        embed.fields.push({
          name: '💎 Boosting Since',
          value: `<t:${Math.floor(member.premiumSinceTimestamp / 1000)}:F>`,
          inline: true
        });
      }
    }

    message.channel.send({ content: ' ', embeds: [embed] });
  }
};
