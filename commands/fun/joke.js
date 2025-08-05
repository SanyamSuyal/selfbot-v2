export default {
  name: 'joke',
  description: 'Tell a random joke',
  category: 'fun',
  aliases: ['funny', 'humor'],
  cooldown: 2,
  usage: 'joke [type]',

  async execute(client, message, args) {
    const jokeType = args[0]?.toLowerCase();
    
    const jokes = {
      programming: [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
        "Why do Java developers wear glasses? Because they don't C#!",
        "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
        "Why don't programmers like nature? It has too many bugs.",
        "There are only 10 types of people in the world: those who understand binary and those who don't.",
        "Programming is like sex: One mistake and you have to support it for the rest of your life.",
        "A programmer's wife tells him: 'Run to the store and pick up a loaf of bread. If they have eggs, get a dozen.' The programmer comes home with 12 loaves of bread."
      ],
      dad: [
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
        "Why don't scientists trust atoms? Because they make up everything!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a bear with no teeth? A gummy bear!",
        "How do you organize a space party? You planet!"
      ],
      random: [
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
        "Why can't a bicycle stand up by itself? It's two tired!",
        "What do you call a sleeping bull? A bulldozer!",
        "Why don't some couples go to the gym? Because some relationships don't work out!",
        "What's orange and sounds like a parrot? A carrot!",
        "Why did the coffee file a police report? It got mugged!",
        "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!"
      ]
    };

    let selectedJokes = jokes.random;
    let jokeCategory = 'Random';

    if (jokeType && jokes[jokeType]) {
      selectedJokes = jokes[jokeType];
      jokeCategory = jokeType.charAt(0).toUpperCase() + jokeType.slice(1);
    }

    const randomJoke = selectedJokes[Math.floor(Math.random() * selectedJokes.length)];

    // Send as plain text to avoid embed issues
    message.channel.send(`😂 **${jokeCategory} Joke**\n\n${randomJoke}\n\n*Available categories: random, programming, dad*`);
  }
};
