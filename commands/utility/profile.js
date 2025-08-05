export default {
  name: 'profile', 
  description: 'Get beautiful user profile information',
  category: 'utility',
  aliases: ['user', 'me'],
  cooldown: 3,
  usage: 'profile [@user]',

  async execute(client, message, args) {
    let user;
    
    if (args[0]) {
      const mention = args[0].replace(/[<@!>]/g, '');
      user = await client.users.fetch(mention).catch(() => null);
      
      if (!user) {
        return message.channel.send('❌ **User Not Found** - Could not find the specified user.');
      }
    } else {
      user = message.author;
    }

    const member = message.guild?.members.cache.get(user.id);
    const accountAge = Math.floor((Date.now() - user.createdTimestamp) / (1000 * 60 * 60 * 24));
    
    let profileText = `👤 **USER PROFILE**

**${user.tag}**
*${user.bot ? '🤖 Bot Account' : '👥 User Account'}*

🆔 **USER ID**
${user.id}

📅 **ACCOUNT CREATED**
${user.createdAt.toLocaleDateString()} (${accountAge} days ago)

🖼️ **AVATAR**
${user.displayAvatarURL({ dynamic: true, size: 256 })}

`;

    // Server-specific info if in a guild
    if (member && message.guild) {
      const joinAge = Math.floor((Date.now() - member.joinedTimestamp) / (1000 * 60 * 60 * 24));
      
      profileText += `🏰 **SERVER INFO**
Joined: ${member.joinedAt.toLocaleDateString()} (${joinAge} days ago)  
Status: ${member.presence?.status ? member.presence.status.charAt(0).toUpperCase() + member.presence.status.slice(1) : 'Unknown'}  

`;

      // Roles
      if (member.roles.cache.size > 1) {
        const roles = member.roles.cache
          .filter(role => role.id !== message.guild.id)
          .sort((a, b) => b.position - a.position)
          .map(role => role.name)
          .slice(0, 10);
        
        profileText += `🎭 **ROLES (${member.roles.cache.size - 1})**
${roles.join(', ')}`;
        
        if (member.roles.cache.size > 11) {
          profileText += ` *+${member.roles.cache.size - 11} more*`;
        }
        profileText += '\n\n';
      }
    }

    // User flags/badges
    const flags = user.flags?.toArray() || [];
    if (flags.length > 0) {
      profileText += `🏆 **BADGES**
${flags.join(', ')}

`;
    }

    profileText += `✨ **Profile generated for ${message.author.tag}**`;

    await message.channel.send(profileText);
  }
};
