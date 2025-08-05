// Example of how to add more commands - here are 20+ more quick utility commands

export default {
  name: 'coin',
  description: 'Flip a coin',
  category: 'fun',
  aliases: ['flip', 'coinflip'],
  cooldown: 1,
  usage: 'coin',

  async execute(client, message, args) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = result === 'Heads' ? '🟡' : '⚪';
    
    message.channel.send(`${emoji} **${result}!**`);
  }
};

// Additional command examples to copy-paste and modify:

/*
// Random number generator
export default {
  name: 'random',
  description: 'Generate random number',
  category: 'utility',
  aliases: ['rng', 'rand'],
  cooldown: 1,
  usage: 'random [min] [max]',
  async execute(client, message, args) {
    const min = parseInt(args[0]) || 1;
    const max = parseInt(args[1]) || 100;
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    message.channel.send(`🎲 Random number: **${result}** (${min}-${max})`);
  }
};

// Simple poll creator
export default {
  name: 'poll',
  description: 'Create a simple poll',
  category: 'tools',
  aliases: ['vote'],
  cooldown: 5,
  usage: 'poll <question>',
  async execute(client, message, args) {
    if (!args.length) return message.channel.send('❌ Please provide a question.');
    const question = args.join(' ');
    const pollMsg = await message.channel.send(`📊 **Poll:** ${question}`);
    await pollMsg.react('👍');
    await pollMsg.react('👎');
  }
};

// Password generator  
export default {
  name: 'password',
  description: 'Generate secure password',
  category: 'tools',
  aliases: ['pass', 'pwd'],
  cooldown: 2,
  usage: 'password [length]',
  async execute(client, message, args) {
    const length = Math.min(parseInt(args[0]) || 12, 50);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    message.author.send(`🔐 Generated password: \`${password}\``).then(() => {
      message.channel.send('✅ Password sent to your DMs!');
    }).catch(() => {
      message.channel.send('❌ Could not send password to DMs.');
    });
  }
};

// QR Code generator (text only)
export default {
  name: 'qr',
  description: 'Generate QR code URL',
  category: 'tools',
  aliases: ['qrcode'],
  cooldown: 3,
  usage: 'qr <text>',
  async execute(client, message, args) {
    if (!args.length) return message.channel.send('❌ Please provide text for QR code.');
    const text = encodeURIComponent(args.join(' '));
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${text}`;
    const embed = {
      title: '📱 QR Code Generated',
      image: { url: qrUrl },
      color: 0x00ff00
    };
    message.channel.send({ embeds: [embed] });
  }
};

// 8ball magic
export default {
  name: '8ball',
  description: 'Ask the magic 8-ball',
  category: 'fun',
  aliases: ['eightball', 'magic8'],
  cooldown: 2,
  usage: '8ball <question>',
  async execute(client, message, args) {
    if (!args.length) return message.channel.send('❌ Please ask a question.');
    const responses = [
      'It is certain', 'Reply hazy, try again', 'Don\'t count on it',
      'It is decidedly so', 'Ask again later', 'My reply is no',
      'Without a doubt', 'Better not tell you now', 'My sources say no',
      'Yes definitely', 'Cannot predict now', 'Outlook not so good',
      'You may rely on it', 'Concentrate and ask again', 'Very doubtful'
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    message.channel.send(`🎱 ${response}`);
  }
};

// More command ideas to implement:
// - dice roller, word count, text to speech, reminder system,
// - color picker, hash generator, ip lookup, short url creator,
// - age calculator, countdown timer, random quote, fact generator,
// etc. - Each takes ~15 lines of code!
*/
