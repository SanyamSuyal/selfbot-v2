/**
 * AFK Status Command - Advanced Discord Selfbot
 * Created by Sanyam Suyal
 * 
 * Shows AFK status and management options
 */

export default {
    name: 'afkstatus',
    description: 'Show AFK system status and commands',
    category: 'utility',
    aliases: ['afks', 'afkhelp'],
    cooldown: 3,
    usage: '!afkstatus',

    async execute(client, message, args) {
        try {
            const afkCount = client.afkUsers ? client.afkUsers.size : 0;
            
            const helpText = `\`\`\`yaml
😴 Advanced AFK System - Created by Sanyam Suyal

📊 Current Status:
• AFK Users: ${afkCount}
• System: Active and monitoring

🎯 Available Commands:
• !afk [message] - Set AFK status
• !afk status - Check your AFK status  
• !afk remove - Remove AFK status
• !afk list - List all AFK users

✨ Features:
• Auto-remove when you send messages
• Mention notifications while AFK
• Duration tracking and statistics
• Notification history storage
• Professional status display

📝 Examples:
• !afk Going to lunch
• !afk brb 5 minutes
• !afk status
• !afk remove

⚡ Smart Features:
• Automatically tracks mentions
• Shows return notifications
• Counts AFK sessions
• Cross-server functionality

The system automatically monitors all messages and mentions!
\`\`\``;

            await message.channel.send(helpText);

        } catch (error) {
            console.error('Error in afkstatus command:', error);
            await message.channel.send('❌ **Error**: Failed to show AFK status.');
        }
    }
};
