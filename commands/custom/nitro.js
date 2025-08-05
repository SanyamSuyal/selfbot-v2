export default {
  name: 'nitro',
  description: 'Generate fake Nitro codes for testing purposes only',
  category: 'custom',
  aliases: ['faknitro', 'fakenitro'],
  cooldown: 5,
  usage: 'nitro [amount]',

  async execute(client, message, args) {
    const amount = Math.min(parseInt(args[0]) || 1, 10); // Limit to 10

    if (amount < 1) {
      return message.channel.send('❌ Please provide a valid amount (1-10).');
    }

    // Generate fake Nitro codes (these are completely fake and won't work)
    const generateFakeNitro = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const fakeCodes = [];
    for (let i = 0; i < amount; i++) {
      fakeCodes.push(`https://discord.gift/${generateFakeNitro()}`);
    }

    // Send as plain text instead of embed to avoid issues
    let response = `🎁 **Fake Nitro Generator**\n`;
    response += `⚠️ **WARNING:** These are FAKE codes for testing purposes only!\n`;
    response += `They will NOT work and are generated randomly.\n\n`;
    response += `🔗 **Generated Codes:**\n`;
    response += fakeCodes.map((code, index) => `${index + 1}. \`${code}\``).join('\n');
    response += `\n\n⚠️ **Important Notice:**\n`;
    response += `• These codes are completely fake\n`;
    response += `• They will not provide any Nitro benefits\n`;
    response += `• Do not attempt to redeem them\n`;
    response += `• For educational/testing purposes only`;

    message.channel.send(response);

    // Log the generation for monitoring
    console.log(`[FAKE NITRO] ${message.author.tag} generated ${amount} fake codes in ${message.guild ? message.guild.name : 'DM'}`);
  }
};
