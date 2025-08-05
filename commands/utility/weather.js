import fetch from 'node-fetch';

export default {
  name: 'weather',
  description: 'Get current weather information for a location',
  category: 'utility',
  aliases: ['w', 'forecast'],
  cooldown: 5,
  usage: 'weather <location>',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide a location.\n**Example:** `!weather London` or `!weather New York, NY`');
    }

    const location = args.join(' ');
    
    try {
      // Using a free weather API (you can replace with OpenWeatherMap API key)
      const response = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`);
      
      if (!response.ok) {
        return message.channel.send('❌ Could not fetch weather data. Please check the location and try again.');
      }

      const data = await response.json();
      const current = data.current_condition[0];
      const location_info = data.nearest_area[0];
      
      const tempC = current.temp_C;
      const tempF = current.temp_F;
      const condition = current.weatherDesc[0].value;
      const humidity = current.humidity;
      const windSpeed = current.windspeedKmph;
      const windDir = current.winddir16Point;
      const visibility = current.visibility;
      const pressure = current.pressure;
      
      const locationName = `${location_info.areaName[0].value}, ${location_info.region[0].value}, ${location_info.country[0].value}`;

      // Weather emoji mapping
      const weatherEmojis = {
        'Sunny': '☀️',
        'Clear': '🌙',
        'Partly cloudy': '⛅',
        'Cloudy': '☁️',
        'Overcast': '☁️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Light rain': '🌦️',
        'Moderate rain': '🌧️',
        'Heavy rain': '🌧️',
        'Light snow': '🌨️',
        'Moderate snow': '❄️',
        'Heavy snow': '❄️',
        'Thundery outbreaks possible': '⛈️',
        'Blizzard': '🌨️'
      };

      const weatherEmoji = weatherEmojis[condition] || '🌤️';

      const embed = {
        title: `${weatherEmoji} Weather for ${locationName}`,
        fields: [
          {
            name: '🌡️ Temperature',
            value: `${tempC}°C (${tempF}°F)`,
            inline: true
          },
          {
            name: '☁️ Condition',
            value: condition,
            inline: true
          },
          {
            name: '💧 Humidity',
            value: `${humidity}%`,
            inline: true
          },
          {
            name: '💨 Wind',
            value: `${windSpeed} km/h ${windDir}`,
            inline: true
          },
          {
            name: '👁️ Visibility',
            value: `${visibility} km`,
            inline: true
          },
          {
            name: '📊 Pressure',
            value: `${pressure} mb`,
            inline: true
          }
        ],
        color: tempC > 25 ? 0xff4500 : tempC > 15 ? 0xffa500 : tempC > 5 ? 0x00ff00 : 0x00bfff,
        timestamp: new Date(),
        footer: {
          text: `Weather data from wttr.in | Requested by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      };

      message.channel.send({ content: ' ', embeds: [embed] });
    } catch (error) {
      message.channel.send('❌ Failed to fetch weather data. The service might be temporarily unavailable.');
    }
  }
};
