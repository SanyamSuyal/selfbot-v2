import { EmbedBuilder, Colors, sendEmbed } from '../../utils/embedBuilder.js';

export default {
  name: 'avatar',
  description: 'Display a user\'s avatar with professional presentation',
  category: 'utility',
  aliases: ['av', 'pfp', 'profile'],
  cooldown: 2,
  usage: 'avatar [@user]',

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
    
    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Avatar - ${user.tag}`)
      .setDescription(`**Profile Picture Gallery**`)
      .setColor(member?.displayHexColor || Colors.DISCORD_BLURPLE)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addField('🆔 User ID', user.id, true)
      .addField('📱 Account Type', user.bot ? 'Bot' : 'User', true)
      .addField('🎨 Avatar Format', user.avatar ? (user.avatar.startsWith('a_') ? 'GIF' : 'PNG/JPG') : 'Default', true)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .build();

    // Add download links
    const avatarLinks = [];
    const baseURL = user.displayAvatarURL({ dynamic: false });
    
    avatarLinks.push(`[PNG 512x512](${user.displayAvatarURL({ format: 'png', size: 512 })})`);
    avatarLinks.push(`[JPG 512x512](${user.displayAvatarURL({ format: 'jpg', size: 512 })})`);
    
    if (user.avatar && user.avatar.startsWith('a_')) {
      avatarLinks.push(`[GIF 512x512](${user.displayAvatarURL({ format: 'gif', size: 512 })})`);
    }
    
    embed.fields.push({
      name: '📥 Download Links',
      value: avatarLinks.join(' • '),
      inline: false
    });

    // Add server avatar if different (Nitro users)
    if (member && member.avatar && member.avatar !== user.avatar) {
      embed.fields.push({
        name: '🏰 Server Avatar',
        value: `[View Server Avatar](${member.displayAvatarURL({ dynamic: true, size: 512 })})`,
        inline: false
      });
    }

    await sendEmbed(message.channel, embed);
  }
};
