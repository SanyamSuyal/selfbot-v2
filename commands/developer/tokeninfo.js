export default {
  name: 'tokeninfo',
  description: 'Get information about your Discord token',
  category: 'developer',
  aliases: ['token', 'whoami'],
  cooldown: 5,
  usage: 'tokeninfo',

  async execute(client, message, args) {
    // Owner-only for security
    if (message.author.id !== process.env.OWNER_ID) {
      return message.channel.send('❌ This command is restricted to the bot owner.');
    }

    const user = client.user;
    const token = process.env.TOKEN;
    
    // Extract token info (basic parsing)
    const tokenParts = token.split('.');
    let tokenInfo = {};
    
    try {
      if (tokenParts.length >= 2) {
        // Decode the user ID from token
        const encodedUserId = tokenParts[0];
        const userId = Buffer.from(encodedUserId, 'base64').toString();
        tokenInfo.extractedUserId = userId;
      }
    } catch (error) {
      tokenInfo.extractedUserId = 'Unable to extract';
    }

    const embed = {
      title: '🔐 Token Information',
      fields: [
        {
          name: '👤 User',
          value: `${user.tag}\n(${user.id})`,
          inline: true
        },
        {
          name: '📧 Email Verified',
          value: user.verified ? '✅ Yes' : '❌ No',
          inline: true
        },
        {
          name: '📱 MFA Enabled',
          value: user.mfaEnabled ? '✅ Yes' : '❌ No',
          inline: true
        },
        {
          name: '🎖️ Account Type',
          value: user.bot ? 'Bot' : 'User',
          inline: true
        },
        {
          name: '📅 Account Created',
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: '🔢 Token Format',
          value: `Length: ${token.length} chars\nParts: ${tokenParts.length}\nStarts: ${token.substring(0, 10)}...`,
          inline: false
        }
      ],
      color: user.verified ? 0x00ff00 : 0xffff00,
      timestamp: new Date(),
      footer: {
        text: '⚠️ Keep your token secure and never share it!',
        icon_url: user.displayAvatarURL()
      }
    };

    if (user.premiumType) {
      embed.fields.push({
        name: '💎 Nitro Type',
        value: user.premiumType === 1 ? 'Nitro Classic' : user.premiumType === 2 ? 'Nitro' : 'Unknown',
        inline: true
      });
    }

    message.channel.send({ embeds: [embed] });
  }
};
