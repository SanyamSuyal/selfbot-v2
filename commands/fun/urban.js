export default {
  name: 'urban',
  description: 'Search Urban Dictionary definitions',
  category: 'fun',
  aliases: ['urbandictionary', 'ud'],
  cooldown: 3,
  usage: 'urban <term>',

  async execute(client, message, args) {
    if (!args.length) {
      return message.channel.send('❌ Please provide a term to search.\n**Example:** `!urban selfbot`');
    }

    const term = args.join(' ');
    
    try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);
      const data = await response.json();

      if (!data.list || data.list.length === 0) {
        return message.channel.send(`❌ No definitions found for **${term}**.`);
      }

      const definition = data.list[0];
      
      // Clean up the definition text
      let def = definition.definition.replace(/\[|\]/g, '');
      let example = definition.example.replace(/\[|\]/g, '');
      
      // Truncate if too long
      if (def.length > 1000) def = def.substring(0, 1000) + '...';
      if (example.length > 500) example = example.substring(0, 500) + '...';

      const embed = {
        title: `📚 Urban Dictionary: ${term}`,
        fields: [
          {
            name: '📖 Definition',
            value: def || 'No definition available',
            inline: false
          },
          {
            name: '💡 Example',
            value: example || 'No example available',
            inline: false
          },
          {
            name: '👍 Upvotes',
            value: definition.thumbs_up.toString(),
            inline: true
          },
          {
            name: '👎 Downvotes',
            value: definition.thumbs_down.toString(),
            inline: true
          },
          {
            name: '👤 Author',
            value: definition.author,
            inline: true
          }
        ],
        color: 0xff6600,
        timestamp: new Date(),
        footer: {
          text: `Definition ${data.list.indexOf(definition) + 1} of ${data.list.length}`,
          icon_url: message.author.displayAvatarURL()
        }
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send('❌ Failed to fetch definition from Urban Dictionary.');
    }
  }
};
