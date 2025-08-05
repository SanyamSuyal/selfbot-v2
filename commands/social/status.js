export default {
  name: 'status',
  description: 'Change your Discord status and activity',
  category: 'social',
  aliases: ['setstatus', 'activity'],
  cooldown: 3,
  usage: 'status <online|idle|dnd|invisible> [activity] [type]',

  async execute(client, message, args) {
    if (!args[0]) {
      return message.channel.send('❌ Please provide a status.\n**Usage:** `!status <online|idle|dnd|invisible> [activity] [type]`\n**Types:** playing, streaming, listening, watching, competing');
    }

    const statusOptions = ['online', 'idle', 'dnd', 'invisible'];
    const status = args[0].toLowerCase();
    
    if (!statusOptions.includes(status)) {
      return message.channel.send(`❌ Invalid status. Choose from: ${statusOptions.join(', ')}`);
    }

    const activity = args.slice(1).join(' ');
    let activityType = 0; // Default: PLAYING

    // Check if last argument is an activity type
    const lastArg = args[args.length - 1]?.toLowerCase();
    const activityTypes = {
      'playing': 0,
      'streaming': 1,
      'listening': 2,
      'watching': 3,
      'competing': 5
    };

    if (activityTypes.hasOwnProperty(lastArg)) {
      activityType = activityTypes[lastArg];
      // Remove the type from activity text
      const activityWords = args.slice(1, -1);
      activity = activityWords.join(' ');
    }

    try {
      const presence = {
        status: status,
        activities: []
      };

      if (activity) {
        presence.activities = [{
          name: activity,
          type: activityType
        }];
      }

      await client.user.setPresence(presence);

      const statusEmojis = {
        'online': '🟢',
        'idle': '🟡',
        'dnd': '🔴',
        'invisible': '⚫'
      };

      const typeNames = {
        0: 'Playing',
        1: 'Streaming',
        2: 'Listening to',
        3: 'Watching',
        5: 'Competing in'
      };

      const embed = {
        title: '✅ Status Updated',
        fields: [
          {
            name: '📱 Status',
            value: `${statusEmojis[status]} ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            inline: true
          }
        ],
        color: 0x00ff00,
        timestamp: new Date()
      };

      if (activity) {
        embed.fields.push({
          name: '🎮 Activity',
          value: `${typeNames[activityType]} ${activity}`,
          inline: true
        });
      }

      message.channel.send({ embeds: [embed] });

      // Delete command message
      setTimeout(() => {
        message.delete().catch(() => {});
      }, 2000);

    } catch (error) {
      message.channel.send('❌ Failed to update status. Please try again.');
    }
  }
};
