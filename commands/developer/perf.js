export default {
  name: 'perf',
  description: 'Show bot performance statistics',
  category: 'developer',
  aliases: ['performance', 'stats', 'botinfo'],
  cooldown: 3,
  usage: 'perf',

  async execute(client, message, args) {
    const startTime = process.hrtime.bigint();
    
    // Get memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsed = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;
    const memoryTotal = Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100;
    
    // Calculate uptime
    const uptimeSeconds = process.uptime();
    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // Get Node.js version
    const nodeVersion = process.version;
    
    // Calculate CPU usage (approximate)
    const cpuUsage = process.cpuUsage();
    const cpuPercent = Math.round((cpuUsage.user + cpuUsage.system) / 1000000 * 100) / 100;
    
    // Get Discord.js version
    const djsVersion = "^3.0.1"; // Approximate version
    
    // Calculate response time
    const endTime = process.hrtime.bigint();
    const responseTime = Number(endTime - startTime) / 1000000; // Convert to milliseconds
    
    const embed = {
      title: '📊 Bot Performance Statistics',
      fields: [
        {
          name: '🖥️ System',
          value: `**OS:** ${process.platform}\n**Node.js:** ${nodeVersion}\n**Discord.js:** ${djsVersion}`,
          inline: true
        },
        {
          name: '💾 Memory Usage',
          value: `**Used:** ${memoryUsed} MB\n**Total:** ${memoryTotal} MB\n**RSS:** ${Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100} MB`,
          inline: true
        },
        {
          name: '⏰ Uptime',
          value: uptimeString,
          inline: true
        },
        {
          name: '🌐 API Latency',
          value: `${Math.round(client.ws.ping)}ms`,
          inline: true
        },
        {
          name: '⚡ Response Time',
          value: `${responseTime.toFixed(2)}ms`,
          inline: true
        },
        {
          name: '📊 Process ID',
          value: process.pid.toString(),
          inline: true
        },
        {
          name: '🏠 Guilds',
          value: client.guilds.cache.size.toString(),
          inline: true
        },
        {
          name: '👥 Users',
          value: client.users.cache.size.toString(),
          inline: true
        },
        {
          name: '📝 Commands',
          value: client.commands ? client.commands.size.toString() : '0',
          inline: true
        }
      ],
      color: 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: `Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL()
      }
    };

    // Add performance indicators
    let performanceStatus = '🟢 Excellent';
    if (memoryUsed > 100) performanceStatus = '🟡 Good';
    if (memoryUsed > 200) performanceStatus = '🟠 Fair';
    if (memoryUsed > 500) performanceStatus = '🔴 Poor';

    embed.fields.push({
      name: '🎯 Performance Status',
      value: performanceStatus,
      inline: true
    });

    message.channel.send({ embeds: [embed] });
  }
};
