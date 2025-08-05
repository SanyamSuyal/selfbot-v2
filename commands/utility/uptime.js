/**
 * Uptime Command - Advanced Discord Selfbot
 * Created by Sanyam Suyal
 * 
 * Shows bot uptime and system information
 */

export default {
    name: 'uptime',
    description: 'Shows bot uptime and system performance metrics',
    category: 'utility',
    usage: '!uptime',
    aliases: ['up', 'runtime'],
    cooldown: 3,

    async execute(client, message, args) {
        try {
            // Calculate uptime
            const uptime = process.uptime();
            const days = Math.floor(uptime / 86400);
            const hours = Math.floor((uptime % 86400) / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            // Format uptime string
            let uptimeString = '';
            if (days > 0) uptimeString += `${days}d `;
            if (hours > 0) uptimeString += `${hours}h `;
            if (minutes > 0) uptimeString += `${minutes}m `;
            uptimeString += `${seconds}s`;

            // Get memory usage
            const memUsage = process.memoryUsage();
            const memUsed = (memUsage.heapUsed / 1024 / 1024).toFixed(2);
            const memTotal = (memUsage.heapTotal / 1024 / 1024).toFixed(2);

            // Get system info
            const nodeVersion = process.version;
            const platform = process.platform;
            const arch = process.arch;

            // Guild and user counts - safely handle cache
            const guilds = client.guilds?.cache?.size || 0;
            const users = client.guilds?.cache ? 
                client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount || 0), 0) : 0;

            // Calculate bot latency
            const ping = Date.now() - message.createdTimestamp;

            const uptimeInfo = `
╭─────────────────────────────────────╮
│           🤖 BOT UPTIME             │
├─────────────────────────────────────┤
│ ⏰ Runtime: ${uptimeString.padEnd(20)} │
│ 📊 Memory: ${memUsed}MB/${memTotal}MB       │
│ 🏓 Latency: ${ping}ms                │
├─────────────────────────────────────┤
│           📈 STATISTICS             │
├─────────────────────────────────────┤
│ 🏠 Guilds: ${guilds.toString().padEnd(22)} │
│ 👥 Users: ${users.toLocaleString().padEnd(23)} │
├─────────────────────────────────────┤
│           🔧 SYSTEM INFO            │
├─────────────────────────────────────┤
│ 🟢 Node.js: ${nodeVersion.padEnd(19)} │
│ 💻 Platform: ${platform.padEnd(18)} │
│ ⚙️ Architecture: ${arch.padEnd(15)} │
╰─────────────────────────────────────╯

**Status**: ✅ Online & Operational
**Started**: ${new Date(Date.now() - uptime * 1000).toLocaleString()}
**Created by**: Sanyam Suyal`;

            await message.channel.send(uptimeInfo);

        } catch (error) {
            console.error(`Error in uptime command:`, error);
            await message.channel.send('❌ **Error**: Failed to retrieve uptime information.');
        }
    }
};
