export default {
  name: 'emojispam',
  description: 'Spam a specific emoji or random emojis',
  category: 'fun',
  aliases: ['spam', 'emojiflood'],
  cooldown: 5,
  usage: 'emojispam <emoji> [count]',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide an emoji to spam.\n**Example:** `!emojispam 🔥 10`');
    }

    const emoji = args[0];
    const count = Math.min(parseInt(args[1]) || 5, 50); // Limit to 50 to avoid spam

    if (count < 1) {
      return message.channel.send('❌ Count must be a positive number.');
    }

    // Check if it's a valid emoji (basic check)
    if (emoji.length > 10 && !emoji.match(/<a?:\w+:\d+>/)) {
      return message.channel.send('❌ Please provide a valid emoji.');
    }

    const randomEmojis = ['🎉', '🔥', '💯', '⭐', '🚀', '💎', '🌟', '⚡', '🎯', '💥', '🎊', '🏆', '👑', '🎈', '🌈'];
    
    let spamMessage = '';
    
    if (emoji.toLowerCase() === 'random') {
      // Random emoji spam
      for (let i = 0; i < count; i++) {
        spamMessage += randomEmojis[Math.floor(Math.random() * randomEmojis.length)] + ' ';
      }
    } else {
      // Specific emoji spam
      spamMessage = (emoji + ' ').repeat(count);
    }

    // Split message if too long for Discord
    if (spamMessage.length > 2000) {
      const chunks = spamMessage.match(/.{1,1900}/g);
      for (let i = 0; i < chunks.length && i < 3; i++) { // Limit to 3 messages
        setTimeout(() => {
          message.channel.send(chunks[i]);
        }, i * 500);
      }
    } else {
      message.channel.send(spamMessage);
    }

    // Delete the original command message after a delay
    setTimeout(() => {
      message.delete().catch(() => {});
    }, 2000);
  }
};
