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
    
    let userText = `👤 **USER INFORMATION**

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
      
      userText += `🏰 **SERVER INFO**
Joined: ${member.joinedAt.toLocaleDateString()} (${joinAge} days ago)  
Status: ${member.presence?.status ? member.presence.status.charAt(0).toUpperCase() + member.presence.status.slice(1) : 'Unknown'}  
Color: ${member.displayHexColor || 'Default'}

`;

      // Roles
      if (member.roles.cache.size > 1) {
        const roles = member.roles.cache
          .filter(role => role.id !== message.guild.id)
          .sort((a, b) => b.position - a.position)
          .map(role => role.name)
          .slice(0, 10);
        
        userText += `🎭 **ROLES (${member.roles.cache.size - 1})**
${roles.join(', ')}`;
        
        if (member.roles.cache.size > 11) {
          userText += ` *+${member.roles.cache.size - 11} more*`;
        }
        userText += '\n\n';
      }

      // Key permissions
      if (member.permissions.has('ADMINISTRATOR')) {
        userText += `🔐 **PERMISSIONS**
👑 Administrator

`;
      } else {
        const keyPerms = [];
        if (member.permissions.has('MANAGE_GUILD')) keyPerms.push('Manage Server');
        if (member.permissions.has('MANAGE_CHANNELS')) keyPerms.push('Manage Channels');
        if (member.permissions.has('MANAGE_MESSAGES')) keyPerms.push('Manage Messages');
        if (member.permissions.has('KICK_MEMBERS')) keyPerms.push('Kick Members');
        if (member.permissions.has('BAN_MEMBERS')) keyPerms.push('Ban Members');
        
        if (keyPerms.length > 0) {
          userText += `🔐 **KEY PERMISSIONS**
${keyPerms.join(', ')}

`;
        }
      }
    }

    // User flags/badges
    const flags = user.flags?.toArray() || [];
    if (flags.length > 0) {
      userText += `🏆 **BADGES**
${flags.join(', ')}

`;
    }

    userText += `✨ *Information requested by ${message.author.tag}*`;

    await message.channel.send(userText);
  }
};
