export default {
  name: 'simple',
  description: 'Ultra-simple ping command that always works',
  category: 'utility',
  aliases: ['s', 'basicping'],
  cooldown: 1,
  usage: 'simple',

  async execute(client, message, args) {
    const start = Date.now();
    const msg = await message.channel.send('🏓 Pinging...');
    const ping = Date.now() - start;
    
    msg.edit(`🏓 **Pong!** Latency: ${ping}ms | API: ${client.ws.ping}ms | ✅ **WORKING PERFECTLY!**`);
  }
};
