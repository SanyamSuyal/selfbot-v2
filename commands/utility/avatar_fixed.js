export default {
  name: 'avatar',
  description: 'Display a user\'s avatar',
  category: 'utility',
  aliases: ['av', 'pfp'],
  cooldown: 2,
  usage: 'avatar [@user]',

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
    
    const avatarText = `🖼️ **AVATAR - ${user.tag}**

👤 **USER:** ${user.tag}
🆔 **ID:** ${user.id}
📱 **Type:** ${user.bot ? 'Bot' : 'User'}
🎨 **Format:** ${user.avatar ? (user.avatar.startsWith('a_') ? 'GIF' : 'PNG/JPG') : 'Default'}

📥 **DOWNLOAD LINKS**
[PNG 512x512](${user.displayAvatarURL({ format: 'png', size: 512 })})
[JPG 512x512](${user.displayAvatarURL({ format: 'jpg', size: 512 })})${user.avatar && user.avatar.startsWith('a_') ? `
[GIF 512x512](${user.displayAvatarURL({ format: 'gif', size: 512 })})` : ''}

🖼️ **MAIN AVATAR**
${user.displayAvatarURL({ dynamic: true, size: 512 })}

${member && member.avatar && member.avatar !== user.avatar ? `🏰 **SERVER AVATAR**
${member.displayAvatarURL({ dynamic: true, size: 512 })}

` : ''}✨ *Avatar requested by ${message.author.tag}*`;

    await message.channel.send(avatarText);
  }
};
