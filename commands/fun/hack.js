export default {
  name: 'hack',
  description: 'Fake hack a user (purely for fun/entertainment)',
  category: 'fun',
  aliases: ['fakehack', 'prank'],
  cooldown: 15,
  usage: 'hack [@user]',

  async execute(client, message, args) {
    let target;
    
    if (args[0]) {
      const mention = args[0].replace(/[<@!>]/g, '');
      target = await client.users.fetch(mention).catch(() => null);
      
      if (!target) {
        return message.channel.send('❌ **Target Not Found** - Please mention a valid user to "hack".');
      }
    } else {
      return message.channel.send('❌ **No Target** - Please specify a user to hack.\n**Usage:** `!hack @username`');
    }

    if (target.id === client.user.id) {
      return message.channel.send('🤖 **Error:** Cannot hack myself. Nice try though!');
    }

    // Random fake data generators
    const generateIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'];
    const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Cedar Ln', 'Maple Dr', 'Elm St', 'Park Ave', 'Washington St', 'Lincoln Ave', 'Jefferson Rd'];
    const schools = ['Washington High', 'Lincoln Elementary', 'Roosevelt Middle', 'Jefferson Academy', 'Madison Prep', 'Monroe Institute', 'Adams College', 'Wilson University'];
    
    const randomNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emily', 'Chris', 'Amanda', 'Ryan', 'Jessica', 'Kevin', 'Ashley'];
    const randomSurnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    const randomPhotos = [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2', 
      'https://picsum.photos/400/400?random=3',
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5'
    ];

    // Generate fake data
    const fakeData = {
      ip: generateIP(),
      location: locations[Math.floor(Math.random() * locations.length)],
      address: `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
      momName: `${randomNames[Math.floor(Math.random() * randomNames.length)]} ${randomSurnames[Math.floor(Math.random() * randomSurnames.length)]}`,
      dadName: `${randomNames[Math.floor(Math.random() * randomNames.length)]} ${randomSurnames[Math.floor(Math.random() * randomSurnames.length)]}`,
      school: schools[Math.floor(Math.random() * schools.length)],
      photo: randomPhotos[Math.floor(Math.random() * randomPhotos.length)]
    };

    // Hacking sequence messages
    const hackingSteps = [
      '🔍 **INITIATING HACK SEQUENCE...**\nTarget acquired: ' + target.tag,
      '💻 **CONNECTING TO MAINFRAME...**\nEstablishing secure connection...',
      '🌐 **BYPASSING FIREWALLS...**\nFirewall 1: BYPASSED ✅\nFirewall 2: BYPASSED ✅',
      '📡 **SCANNING NETWORK PORTS...**\nPort 80: OPEN\nPort 443: OPEN\nPort 22: VULNERABLE',
      '🔓 **CRACKING ENCRYPTION...**\nAES-256: CRACKED\nRSA-2048: CRACKED',
      '📱 **ACCESSING SOCIAL MEDIA...**\nInstagram: ACCESSED\nTwitter: ACCESSED\nDiscord: HACKED',
      '🏠 **GATHERING PERSONAL DATA...**\nLocation services: TRACKED\nBrowsing history: DOWNLOADED',
      '📊 **COMPILING DATABASE...**\nCross-referencing public records...\nData mining in progress...',
      '🎯 **FINALIZING HACK...**\nGenerating comprehensive profile...'
    ];

    let hackMsg;
    
    try {
      hackMsg = await message.channel.send(hackingSteps[0]);
      
      // Show hacking progress
      for (let i = 1; i < hackingSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        try {
          await hackMsg.edit(hackingSteps[i]);
        } catch (error) {
          // If edit fails, send new message
          hackMsg = await message.channel.send(hackingSteps[i]);
        }
      }
      
      // Wait for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Final "hacked" result
      const hackedResult = `🚨 **HACK COMPLETE - TARGET COMPROMISED** 🚨

👤 **TARGET:** ${target.tag}
🆔 **USER ID:** ${target.id}

📍 **LOCATION DATA:**
🌍 **Current Location:** ${fakeData.location}
🏠 **Home Address:** ${fakeData.address}
📶 **IP Address:** ${fakeData.ip}

👨‍👩‍👧‍👦 **FAMILY DATA:**
👩 **Mother's Name:** ${fakeData.momName}
👨 **Father's Name:** ${fakeData.dadName}

🎓 **EDUCATION:**
🏫 **School:** ${fakeData.school}

📸 **SURVEILLANCE PHOTO:**
${fakeData.photo}

⚠️ **DISCLAIMER:** This is a FAKE hack for entertainment purposes only! No real data was accessed. This is purely a joke command.

🎭 **Prank Status:** SUCCESSFUL
⏰ **Time:** ${new Date().toLocaleTimeString()}
🎯 **Pranked by:** ${message.author.tag}`;

      await hackMsg.edit(hackedResult);

    } catch (error) {
      await message.channel.send(`❌ **Hack Failed** - Target's security was too strong! 
      
*Error: ${error.message}*

🛡️ **Target Status:** SECURE
🎭 **Prank Status:** FAILED`);
    }
  }
};
