export default {
  name: 'ping',
  description: 'Check bot latency and response time',
  category: 'utility',
  aliases: ['p', 'latency'],
  cooldown: 2,
  usage: 'ping',

  async execute(client, message, args) {
    const sent = await message.channel.send('🏓 **Calculating ping...**');
    
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);
    
    const pingText = `🏓 **PONG!**

📡 **MESSAGE LATENCY**
${latency}ms

🌐 **API LATENCY** 
${apiLatency}ms

⚡ **STATUS**
${latency < 100 ? '🟢 Excellent' : latency < 200 ? '🟡 Good' : '🔴 Slow'}

🤖 **BOT INFO**
Uptime: ${Math.floor(process.uptime() / 60)}m ${Math.floor(process.uptime() % 60)}s
Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB

✨ *Response calculated for ${message.author.tag}*`;

    await sent.edit(pingText);
  }
};
