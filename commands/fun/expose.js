export default {
  name: 'expose',
  description: 'Expose embarrassing fake secrets about a user (prank command)',
  category: 'fun',
  aliases: ['secrets', 'dirt'],
  cooldown: 15,
  usage: 'expose [@user]',

  async execute(client, message, args) {
    let target;
    
    if (args[0]) {
      const mention = args[0].replace(/[<@!>]/g, '');
      target = await client.users.fetch(mention).catch(() => null);
      
      if (!target) {
        return message.channel.send('❌ **Target Not Found** - Please mention a valid user to expose.');
      }
    } else {
      return message.channel.send('❌ **No Target** - Please specify a user to expose.\n**Usage:** `!expose @username`');
    }

    if (target.id === client.user.id) {
      return message.channel.send('🤖 **Error:** Cannot expose myself. I have no secrets!');
    }

    // Random embarrassing fake data (more dank/edgy)
    const searchHistory = [
      'how to ask someone out without sounding desperate',
      'is it normal to cry during Shrek',
      'how to pretend you have your life together',
      'why am I attracted to anime characters',
      'how to hide the fact that I still live with parents',
      'signs that you\'re a disappointment to your family',
      'how to fake confidence when you have none',
      'is it weird to have a waifu pillow',
      'how to explain why I have no friends',
      'am I too old to still play video games all day'
    ];

    const embarrassingSecrets = [
      'Has a secret collection of cringe TikToks saved',
      'Still watches cartoons and gets emotionally invested',
      'Practices pickup lines on their reflection',
      'Has never been in a real relationship',
      'Pretends to understand crypto but bought Dogecoin',
      'Gets anxiety ordering pizza over the phone',
      'Still asks mom to make doctor appointments',
      'Has a Reddit account with 50k karma',
      'Unironically enjoys pineapple on pizza',
      'Uses incognito mode to Google basic questions'
    ];

    const cringeHabits = [
      'Says "based" in real conversations',
      'Corrects people\'s grammar in text messages',
      'Makes finger guns at themselves in mirrors',
      'References dead memes from 2019',
      'Argues with 12-year-olds on Discord',
      'Uses "poggers" unironically in public',
      'Still dabs when nobody\'s watching',
      'Makes sus jokes about everything',
      'Quotes The Office way too much',
      'Tries to rickroll people in 2025'
    ];

    const dankImages = [
      'https://i.imgflip.com/1bij.jpg',
      'https://i.imgflip.com/2/30b1gx.jpg',
      'https://i.imgflip.com/26am.jpg',
      'https://i.imgflip.com/1ur9b0.jpg',
      'https://i.imgflip.com/2d3al6.jpg'
    ];

    // Investigation sequence
    const investigationSteps = [
      '🔍 **INITIATING DEEP INVESTIGATION...**\nTarget: ' + target.tag,
      '📱 **ACCESSING SOCIAL MEDIA HISTORY...**\nScanning posts, likes, and comments...',
      '🌐 **ANALYZING BROWSER DATA...**\nExtracting search history...',
      '📧 **INTERCEPTING MESSAGES...**\nReading DMs and group chats...',
      '📸 **SCANNING PHOTO ALBUMS...**\nAnalyzing embarrassing photos...',
      '🎭 **CROSS-REFERENCING BEHAVIOR...**\nIdentifying cringe patterns...',
      '📊 **COMPILING EVIDENCE...**\nGenerating embarrassment report...',
      '🎯 **FINALIZING EXPOSURE...**\nPreparing public humiliation...'
    ];

    let exposeMsg;
    
    try {
      exposeMsg = await message.channel.send(investigationSteps[0]);
      
      // Show investigation progress
      for (let i = 1; i < investigationSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1800 + Math.random() * 1000));
        try {
          await exposeMsg.edit(investigationSteps[i]);
        } catch (error) {
          exposeMsg = await message.channel.send(investigationSteps[i]);
        }
      }
      
      // Wait for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Generate random selections
      const selectedSearches = searchHistory.sort(() => 0.5 - Math.random()).slice(0, 5);
      const selectedSecrets = embarrassingSecrets.sort(() => 0.5 - Math.random()).slice(0, 4);
      const selectedHabits = cringeHabits.sort(() => 0.5 - Math.random()).slice(0, 3);
      const selectedImage = dankImages[Math.floor(Math.random() * dankImages.length)];
      
      // Final exposure result
      const exposureResult = `🚨 **EXPOSURE COMPLETE - SECRETS REVEALED** 🚨

👤 **TARGET:** ${target.tag}
🎭 **CRINGE LEVEL:** MAXIMUM OVERDRIVE

🔍 **RECENT SEARCH HISTORY:**
${selectedSearches.map((search, i) => `${i + 1}. "${search}"`).join('\n')}

😱 **EMBARRASSING SECRETS:**
${selectedSecrets.map((secret, i) => `• ${secret}`).join('\n')}

🤡 **CRINGE HABITS:**
${selectedHabits.map((habit, i) => `• ${habit}`).join('\n')}

📸 **EVIDENCE PHOTO:**
${selectedImage}

📊 **DEGENERACY STATISTICS:**
• Times said "sus" this week: ${Math.floor(Math.random() * 100) + 20}
• Hours on Reddit today: ${Math.floor(Math.random() * 16) + 4}
• Unread Discord notifications: ${Math.floor(Math.random() * 999) + 500}
• Simping level: ${Math.floor(Math.random() * 10) + 1}/10

⚠️ **DISCLAIMER:** This is completely FAKE roasting for entertainment! No real data was accessed. It's all memes bro!

🎭 **Roast Status:** ABSOLUTELY DESTROYED
⏰ **Time:** ${new Date().toLocaleTimeString()}
🎯 **Exposed by:** ${message.author.tag}`;

      await exposeMsg.edit(exposureResult);

    } catch (error) {
      await message.channel.send(`❌ **Exposure Failed** - Target's privacy settings were too strong!
      
*Error: ${error.message}*

🛡️ **Target Status:** PROTECTED
🎭 **Prank Status:** FAILED`);
    }
  }
};
