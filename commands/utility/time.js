export default {
  name: 'time',
  description: 'Display current time in various timezones',
  category: 'utility',
  aliases: ['clock', 'timezone', 'tz'],
  cooldown: 2,
  usage: 'time [timezone]',

  async execute(client, message, args) {
    const timezone = args[0];
    const now = new Date();

    if (timezone) {
      try {
        // Try to format time for specific timezone
        const timeOptions = {
          timeZone: timezone,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        };

        const formattedTime = now.toLocaleString('en-US', timeOptions);
        
        const embed = {
          title: `🕐 Time in ${timezone}`,
          description: `**${formattedTime}**`,
          color: 0x00ff00,
          timestamp: new Date(),
          footer: {
            text: `Requested by ${message.author.tag}`,
            icon_url: message.author.displayAvatarURL()
          }
        };

        return message.channel.send({ content: ' ', embeds: [embed] });
      } catch (error) {
        return message.channel.send(`❌ Invalid timezone: \`${timezone}\`\n**Examples:** UTC, America/New_York, Europe/London, Asia/Tokyo`);
      }
    }

    // Show multiple timezones
    const timezones = [
      { name: 'UTC', tz: 'UTC' },
      { name: 'EST (New York)', tz: 'America/New_York' },
      { name: 'PST (Los Angeles)', tz: 'America/Los_Angeles' },
      { name: 'GMT (London)', tz: 'Europe/London' },
      { name: 'CET (Paris)', tz: 'Europe/Paris' },
      { name: 'JST (Tokyo)', tz: 'Asia/Tokyo' },
      { name: 'AEST (Sydney)', tz: 'Australia/Sydney' }
    ];

    const timeFields = timezones.map(({ name, tz }) => {
      const time = now.toLocaleString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const date = now.toLocaleDateString('en-US', {
        timeZone: tz,
        month: 'short',
        day: 'numeric'
      });

      return {
        name: name,
        value: `${time}\n${date}`,
        inline: true
      };
    });

    const embed = {
      title: '🌍 World Clock',
      fields: timeFields,
      color: 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: `Use !time <timezone> for specific timezone | Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL()
      }
    };

    message.channel.send({ content: ' ', embeds: [embed] });
  }
};
