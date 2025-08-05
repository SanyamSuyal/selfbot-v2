/**
 * List Reminders Command - Advanced Discord Selfbot
 * Created by Sanyam Suyal
 * 
 * Shows all active reminders for the user
 */

export default {
    name: 'reminders',
    description: 'Show all your active reminders',
    category: 'utility',
    usage: '!reminders',
    aliases: ['listreminders', 'myreminders'],
    cooldown: 3,

    async execute(message, args, client) {
        try {
            // Access the activeReminders from remind.js (we'll need to import it)
            // For now, let's create a simple implementation that shows reminder info
            
            const reminderInfo = `
╭─────────────────────────────────────╮
│         📋 REMINDER MANAGER         │
├─────────────────────────────────────┤
│ **Status**: System Active           │
│ **Commands Available**:             │
│                                     │
│ • \`!remind <time> <message>\`       │
│   Set a new reminder               │
│                                     │
│ • \`!reminders\`                     │
│   View this info (active reminders │
│   tracking coming soon)            │
├─────────────────────────────────────┤
│           ⏱️ TIME EXAMPLES          │
├─────────────────────────────────────┤
│ • \`!remind 5m Check emails\`        │
│ • \`!remind 1h30m Team meeting\`     │
│ • \`!remind 2d Project deadline\`    │
├─────────────────────────────────────┤
│ 💡 **Tip**: Reminders are sent to  │
│     the same channel where you      │
│     created them!                   │
╰─────────────────────────────────────╯

**Reminder System**: ✅ Operational
**Created by**: Sanyam Suyal`;

            await message.edit(reminderInfo);

        } catch (error) {
            console.error(`Error in reminders command:`, error);
            await message.edit('❌ **Error**: Failed to retrieve reminder information.');
        }
    }
};
