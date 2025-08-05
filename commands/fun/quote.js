import { EmbedBuilder, Colors, sendEmbed } from '../../utils/embedBuilder.js';

export default {
  name: 'quote',
  description: 'Get an inspirational quote with beautiful formatting',
  category: 'fun',
  aliases: ['inspiration', 'motivate', 'wisdom'],
  cooldown: 3,
  usage: 'quote',

  async execute(client, message, args) {
    const quotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "Success"
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs", 
        category: "Innovation"
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        category: "Life"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "Dreams"
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        category: "Hope"
      },
      {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "Motivation"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "Courage"
      },
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "Action"
      },
      {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers",
        category: "Present"
      },
      {
        text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
        author: "Unknown",
        category: "Growth"
      },
      {
        text: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
        author: "Jim Rohn",
        category: "Risk"
      },
      {
        text: "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea.",
        author: "Swami Vivekananda",
        category: "Focus"
      },
      {
        text: "All our dreams can come true if we have the courage to pursue them.",
        author: "Walt Disney",
        category: "Dreams"
      },
      {
        text: "Good things happen to those who hustle.",
        author: "Anais Nin",
        category: "Hard Work"
      },
      {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller",
        category: "Excellence"
      }
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Color based on category
    const categoryColors = {
      'Success': Colors.SUCCESS,
      'Innovation': Colors.DISCORD_BLURPLE,
      'Life': Colors.INFO,
      'Dreams': Colors.PURPLE,
      'Hope': Colors.WARNING,
      'Motivation': Colors.SUCCESS,
      'Courage': Colors.ERROR,
      'Action': Colors.PRIMARY,
      'Present': Colors.INFO,
      'Growth': Colors.SUCCESS,
      'Risk': Colors.WARNING,
      'Focus': Colors.PURPLE,
      'Hard Work': Colors.PRIMARY,
      'Excellence': Colors.GOLD
    };

    const embed = new EmbedBuilder()
      .setTitle('✨ Daily Inspiration')
      .setDescription(`*"${randomQuote.text}"*`)
      .setColor(categoryColors[randomQuote.category] || Colors.DISCORD_BLURPLE)
      .addField('👤 Author', randomQuote.author, true)
      .addField('📚 Category', randomQuote.category, true)
      .addField('🎯 Share the Wisdom', 'Spread positivity and inspire others!', false)
      .setTimestamp()
      .setFooter(`Inspired by ${message.author.tag}`, message.author.displayAvatarURL())
      .build();

    await sendEmbed(message.channel, embed);
  }
};
