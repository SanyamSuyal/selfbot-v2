/**
 * Remind Command - Advanced Discord Selfbot
 * Created by Sanyam Suyal
 * 
 * Sets reminders for the user
 */

// Store active reminders
const activeReminders = new Map();

export default {
    name: 'remind',
    description: 'Set a reminder for yourself',
    category: 'utility',
    usage: '!remind <time> <message>',
    examples: [
        '!remind 10m Take a break',
        '!remind 1h Meeting with team',
        '!remind 30s Test reminder'
    ],
    aliases: ['reminder', 'remindme'],
    cooldown: 2,

    async execute(client, message, args) {
        try {
            // Convert args to array if it's a string
            const argsArray = Array.isArray(args) ? args : (typeof args === 'string' ? args.trim().split(' ') : []);
            
            if (argsArray.length < 2) {
                const usage = `\`\`\`yaml
⏰ Remind Command Usage

Format: !remind <time> <message>

📝 Examples:
• !remind 10m Take a break
• !remind 1h Meeting with team  
• !remind 30s Test reminder
• !remind 2h30m Lunch break

⏱️ Time Formats:
• s = seconds (e.g., 30s)
• m = minutes (e.g., 15m)
• h = hours (e.g., 2h)
• d = days (e.g., 1d)

Created by: Sanyam Suyal
\`\`\``;
                
                return await message.channel.send(usage);
            }

            const timeString = argsArray[0];
            const reminderMessage = argsArray.slice(1).join(' ');

            // Parse time string
            const time = this.parseTime(timeString);
            if (!time) {
                return await message.channel.send('❌ **Error**: Invalid time format! Use formats like: 10m, 1h30m, 2d, 30s');
            }

            if (time < 1000) {
                return await message.channel.send('❌ **Error**: Reminder time must be at least 1 second!');
            }

            if (time > 86400000 * 30) { // 30 days max
                return await message.channel.send('❌ **Error**: Reminder time cannot exceed 30 days!');
            }

            // Create reminder
            const reminderId = Date.now().toString();
            const reminderTime = Date.now() + time;
            const humanTime = this.formatTime(time);

            // Store reminder
            activeReminders.set(reminderId, {
                userId: message.author.id,
                channelId: message.channel.id,
                message: reminderMessage,
                time: reminderTime,
                timeout: setTimeout(async () => {
                    try {
                        const reminderText = `\`\`\`yaml
🔔 Reminder Alert!

Message: "${reminderMessage}"
Set: ${humanTime} ago
Channel: #${message.channel.name || 'DM'}

Time's up! ⏰
\`\`\``;

                        await message.channel.send(`${message.author} ${reminderText}`);
                        
                        // Remove from storage
                        activeReminders.delete(reminderId);
                        
                        console.log(`Reminder triggered for ${message.author.tag}: ${reminderMessage}`);
                    } catch (error) {
                        console.error('Error sending reminder:', error);
                        activeReminders.delete(reminderId);
                    }
                }, time)
            });

            // Confirmation message
            const confirmMessage = `\`\`\`yaml
✅ Reminder Set Successfully!

Message: "${reminderMessage}"
Duration: ${humanTime}
Reminds at: ${new Date(reminderTime).toLocaleString()}

I'll ping you when it's time! ⏰
\`\`\``;

            await message.channel.send(confirmMessage);

            console.log(`Reminder set by ${message.author.tag} for ${humanTime}: ${reminderMessage}`);

        } catch (error) {
            console.error('Error in remind command:', error);
            await message.channel.send('❌ **Error**: Failed to set reminder. Please try again.');
        }
    },

    // Parse time string (e.g., "10m", "1h30m", "2d")
    parseTime(timeString) {
        try {
            let totalMs = 0;
            
            // Match patterns like 1d, 2h, 30m, 45s
            const timeRegex = /(\d+)([dhms])/g;
            let match;
            
            while ((match = timeRegex.exec(timeString)) !== null) {
                const value = parseInt(match[1]);
                const unit = match[2];
                
                switch (unit) {
                    case 's':
                        totalMs += value * 1000;
                        break;
                    case 'm':
                        totalMs += value * 60 * 1000;
                        break;
                    case 'h':
                        totalMs += value * 60 * 60 * 1000;
                        break;
                    case 'd':
                        totalMs += value * 24 * 60 * 60 * 1000;
                        break;
                }
            }
            
            return totalMs > 0 ? totalMs : null;
        } catch (error) {
            return null;
        }
    },

    // Format time for display
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days !== 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
    }
};
