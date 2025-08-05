export default {
  name: 'avatar',
  description: 'Get user avatar in high resolution',
  category: 'utility',
  aliases: ['av', 'pfp', 'profilepic'],
  cooldown: 2,
  usage: 'avatar [@user]',

  async execute(client, message, args) {
    let user = message.author;
    
    if (args[0]) {
      const mention = args[0].replace(/[<@!>]/g, '');
      user = client.users.cache.get(mention) || 
             client.users.cache.find(u => u.username.toLowerCase().includes(args.join(' ').toLowerCase()));
    }

    if (!user) {
      return message.channel.send('❌ User not found.');
    }

    const embed = {
      title: `🖼️ ${user.tag}'s Avatar`,
      image: {
        url: user.displayAvatarURL({ dynamic: true, size: 1024 })
      },
      fields: [
        {
          name: '🔗 Links',
          value: `[PNG](${user.displayAvatarURL({ format: 'png', size: 1024 })}) | [JPG](${user.displayAvatarURL({ format: 'jpg', size: 1024 })}) | [WEBP](${user.displayAvatarURL({ format: 'webp', size: 1024 })})`,
          inline: false
        }
      ],
      color: 0x00ff00,
      timestamp: new Date()
    };

    message.channel.send({ embeds: [embed] });
  }
};
