/**
 * Advanced AFK Command - Discord Selfbot
 * Created by Sanyam Suyal
 * 
 * Advanced AFK system with tracking, notifications, and statistics
 */

// AFK data storage
const afkData = new Map();
const afkNotifications = new Map();
const recentlySetAFK = new Set(); // Prevent immediate auto-return

export default {
    name: 'afk',
    description: 'Advanced AFK system with tracking and notifications',
    category: 'utility',
    aliases: ['away', 'brb'],
    cooldown: 2,
    usage: 'afk [message] | afk status | afk remove',

    async execute(client, message, args) {
        try {
            // Ensure AFK storage exists
            if (!client.afkUsers) {
                client.afkUsers = new Map();
            }

            const subCommand = args[0]?.toLowerCase();
            const userId = message.author.id;

            // Handle subcommands
            if (subCommand === 'status') {
                return await this.showStatus(message, userId);
            }

            if (subCommand === 'remove' || subCommand === 'clear') {
                return await this.removeAFK(client, message, userId);
            }

            if (subCommand === 'list') {
                return await this.listAFK(client, message);
            }

            // Set AFK status
            await this.setAFK(client, message, args, userId);

        } catch (error) {
            console.error('Error in AFK command:', error);
            await message.channel.send('❌ **Error**: Failed to process AFK command.');
        }
    },

    async setAFK(client, message, args, userId) {
        const afkMessage = args.length > 0 ? args.join(' ') : 'AFK - Away from keyboard';
        const timestamp = Date.now();

        // Enhanced AFK data
        const afkInfo = {
            message: afkMessage,
            timestamp: timestamp,
            channelId: message.channel.id,
            guildId: message.guild?.id || 'DM',
            mentions: 0,
            lastSeen: timestamp,
            returns: afkData.get(userId)?.returns || 0
        };

        // Store in both maps
        client.afkUsers.set(userId, afkInfo);
        afkData.set(userId, afkInfo);

        // Clear any existing notifications
        afkNotifications.delete(userId);

        // Prevent auto-return for 5 seconds after setting AFK
        recentlySetAFK.add(userId);
        setTimeout(() => {
            recentlySetAFK.delete(userId);
        }, 5000);

        // Create response
        const response = `\`\`\`yaml
😴 AFK Status Activated

User: ${message.author.tag}
Status: "${afkMessage}"
Time: ${new Date(timestamp).toLocaleString()}
Location: ${message.guild?.name || 'Direct Messages'}

You will be notified of mentions while away.
Use "!afk remove" to return or just send any message.
\`\`\``;

        await message.channel.send(response);

        console.log(`${message.author.tag} is now AFK: ${afkMessage}`);
    },

    async removeAFK(client, message, userId) {
        const afkInfo = client.afkUsers.get(userId);
        
        if (!afkInfo) {
            return await message.channel.send('❌ **You are not currently AFK!**');
        }

        // Calculate AFK duration
        const duration = Date.now() - afkInfo.timestamp;
        const formattedDuration = this.formatDuration(duration);

        // Update return count
        afkInfo.returns = (afkInfo.returns || 0) + 1;

        // Remove AFK status
        client.afkUsers.delete(userId);
        afkData.delete(userId);
        afkNotifications.delete(userId);

        // Create return message
        const response = `\`\`\`yaml
👋 Welcome Back!

User: ${message.author.tag}
AFK Duration: ${formattedDuration}
Mentions received: ${afkInfo.mentions || 0}
Total AFK sessions: ${afkInfo.returns}

You are no longer AFK.
\`\`\``;

        await message.channel.send(response);

        console.log(`${message.author.tag} returned from AFK after ${formattedDuration}`);
    },

    async showStatus(message, userId) {
        const afkInfo = afkData.get(userId) || client.afkUsers?.get(userId);
        
        if (!afkInfo) {
            return await message.channel.send('❌ **You are not currently AFK!**');
        }

        const duration = Date.now() - afkInfo.timestamp;
        const formattedDuration = this.formatDuration(duration);

        const response = `\`\`\`yaml
📊 Your AFK Status

Status: "${afkInfo.message}"
Duration: ${formattedDuration}
Started: ${new Date(afkInfo.timestamp).toLocaleString()}
Mentions: ${afkInfo.mentions || 0}
Location: ${afkInfo.guildId === 'DM' ? 'Direct Messages' : 'Server'}

Use "!afk remove" to return.
\`\`\``;

        await message.channel.send(response);
    },

    async listAFK(client, message) {
        if (!client.afkUsers || client.afkUsers.size === 0) {
            return await message.channel.send('📋 **No users are currently AFK.**');
        }

        let afkList = '📋 **Currently AFK Users:**\n\n';
        let count = 0;

        for (const [userId, afkInfo] of client.afkUsers) {
            if (count >= 10) break; // Limit to 10 users
            
            const user = client.users.cache.get(userId);
            const duration = this.formatDuration(Date.now() - afkInfo.timestamp);
            
            afkList += `👤 **${user?.tag || 'Unknown User'}**\n`;
            afkList += `   Status: ${afkInfo.message}\n`;
            afkList += `   Duration: ${duration}\n`;
            afkList += `   Mentions: ${afkInfo.mentions || 0}\n\n`;
            count++;
        }

        if (client.afkUsers.size > 10) {
            afkList += `*...and ${client.afkUsers.size - 10} more users*`;
        }

        await message.channel.send(afkList);
    },

    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d ${hours % 24}h ${minutes % 60}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    },

    // Handle mentions while AFK
    async handleMention(client, message) {
        if (!client.afkUsers) return;

        // Check if any AFK users were mentioned
        for (const [userId, afkInfo] of client.afkUsers) {
            if (message.mentions.users.has(userId)) {
                // Increment mention counter
                afkInfo.mentions = (afkInfo.mentions || 0) + 1;
                
                // Store notification
                if (!afkNotifications.has(userId)) {
                    afkNotifications.set(userId, []);
                }
                
                afkNotifications.get(userId).push({
                    author: message.author.tag,
                    content: message.content.slice(0, 100),
                    channel: message.channel.name || 'DM',
                    timestamp: Date.now()
                });

                // Send AFK notification
                const user = client.users.cache.get(userId);
                const duration = this.formatDuration(Date.now() - afkInfo.timestamp);
                
                const afkResponse = `\`\`\`yaml
😴 User is AFK

User: ${user?.tag || 'Unknown'}
Status: "${afkInfo.message}"
AFK for: ${duration}
Mentions: ${afkInfo.mentions}

They will be notified when they return.
\`\`\``;

                await message.channel.send(afkResponse);
            }
        }
    },

    // Auto-remove AFK when user sends message
    async checkReturn(client, message) {
        if (!client.afkUsers) return;

        const userId = message.author.id;
        const afkInfo = client.afkUsers.get(userId);

        if (afkInfo) {
            // Check if user recently set AFK (prevent immediate auto-return)
            if (recentlySetAFK.has(userId)) {
                console.log(`Ignoring auto-return for ${message.author.tag} - recently set AFK`);
                return;
            }

            // User returned by sending a message
            const duration = Date.now() - afkInfo.timestamp;
            const formattedDuration = this.formatDuration(duration);

            // Show notifications if any
            const notifications = afkNotifications.get(userId) || [];
            
            let returnMessage = `\`\`\`yaml
👋 Welcome Back!

User: ${message.author.tag}
AFK Duration: ${formattedDuration}
Mentions received: ${afkInfo.mentions || 0}
\`\`\``;

            if (notifications.length > 0) {
                returnMessage += `\n📬 **You have ${notifications.length} notification(s) while AFK:**\n`;
                notifications.slice(0, 3).forEach((notif, index) => {
                    returnMessage += `${index + 1}. **${notif.author}** in #${notif.channel}: ${notif.content}\n`;
                });
                
                if (notifications.length > 3) {
                    returnMessage += `*...and ${notifications.length - 3} more*\n`;
                }
            }

            // Remove AFK status
            client.afkUsers.delete(userId);
            afkNotifications.delete(userId);

            await message.channel.send(returnMessage);

            console.log(`${message.author.tag} auto-returned from AFK after ${formattedDuration}`);
        }
    }
};
