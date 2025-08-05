# 🚀 Discord Selfbot - Installation & Setup Guide

## ⚠️ IMPORTANT DISCLAIMER
**This selfbot is for educational and personal use only. Using selfbots violates Discord's Terms of Service and may result in account termination. Use at your own risk.**

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Git** (optional, for cloning) - [Download here](https://git-scm.com/)
4. A **Discord account** (obviously!)

## 🔧 Installation Steps

### Step 1: Download the Project

**Option A: Download ZIP**
1. Download the project as a ZIP file
2. Extract it to your desired location (e.g., `Desktop/selfbot`)

**Option B: Clone with Git**
```bash
git clone <repository-url>
cd selfbot
```

### Step 2: Install Dependencies

Open a terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- `discord.js-selfbot-v13` - Discord selfbot library
- `dotenv` - Environment variables
- `chalk` - Colorized console output
- `figlet` - ASCII art banner
- `node-fetch` - HTTP requests
- `axios` - Alternative HTTP client

### Step 3: Get Your Discord Token

**⚠️ KEEP YOUR TOKEN SECRET! Never share it with anyone!**

1. Open Discord in your web browser
2. Press `F12` to open Developer Tools
3. Go to the **Network** tab
4. Send a message in any channel
5. Look for a request to `https://discord.com/api/v*/messages`
6. Click on it and go to **Request Headers**
7. Find the `Authorization` header - this is your token
8. Copy the token (it should start with something like `mfa.` or be a long string)

### Step 4: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your details:
   ```env
   TOKEN=your_discord_token_here
   PREFIX=!
   OWNER_ID=your_user_id_here
   
   # Optional settings
   DEBUG=false
   COMMAND_COOLDOWN=2
   MAX_MESSAGE_DELETE=100
   ```

**To get your User ID:**
1. Enable Developer Mode in Discord Settings > Advanced
2. Right-click your profile and select "Copy ID"

### Step 5: Run the Selfbot

**Option A: Using npm**
```bash
npm start
```

**Option B: Using start scripts**

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

## 🎮 Usage Guide

### Basic Commands

- `!help` - Show all available commands
- `!ping` - Check bot latency
- `!userinfo [@user]` - Get user information
- `!serverinfo` - Get server information

### Command Categories

1. **⚙️ Utility** - Basic functions (ping, userinfo, calc, time, weather)
2. **🎉 Fun** - Entertainment (memes, jokes, ascii art, emoji spam)
3. **🔧 Tools** - Productivity (mass delete, embed creator, code formatter)
4. **👥 Social** - Social features (auto-DM, auto-react, status changer)
5. **💻 Developer** - Dev tools (eval, shell commands, performance stats)
6. **🎨 Custom** - Special features (templates, fake nitro generator)

### Example Commands

```bash
# Utility
!ping                           # Check latency
!calc 2 + 2 * 3                # Calculator
!weather London                 # Weather info
!userinfo @username             # User details

# Fun
!meme                          # Random meme
!joke programming              # Programming joke
!ascii Hello                   # ASCII art
!emojispam 🔥 10              # Emoji spam

# Tools
!massdelete 50                 # Delete your last 50 messages
!embed Title | Description     # Create custom embed
!base64 encode Hello World     # Base64 encoding

# Social
!autodm enable                 # Enable auto-DM for new members
!autoreact enable              # Enable auto-reactions
!status online Playing games   # Change your status

# Developer (Owner only)
!eval console.log("test")      # Execute JavaScript
!shell ls -la                  # Run shell commands
!perf                          # Performance statistics
```

## 🛠️ Customization

### Adding New Commands

1. Create a new `.js` file in the appropriate category folder under `commands/`
2. Follow this template:

```javascript
export default {
  name: 'commandname',
  description: 'Command description',
  category: 'utility', // utility, fun, tools, social, developer, custom
  aliases: ['alias1', 'alias2'],
  cooldown: 3, // seconds
  usage: 'commandname <required> [optional]',

  async execute(client, message, args) {
    // Your command logic here
    message.channel.send('Hello World!');
  }
};
```

3. Restart the bot to load the new command

### Modifying Settings

Edit the `config/config.js` file to change:
- Default cooldowns
- Color schemes
- Category names
- Other bot settings

## 🔧 Troubleshooting

### Common Issues

**1. "Invalid Token" Error**
- Double-check your token in the `.env` file
- Make sure there are no extra spaces
- Ensure the token is for a user account, not a bot

**2. Commands Not Working**
- Check if you're using the correct prefix (default: `!`)
- Ensure you're running the command from your own account
- Verify the command exists with `!help`

**3. Permission Errors**
- Some commands require specific Discord permissions
- Make sure you have the necessary permissions in the server

**4. Rate Limiting**
- Discord has rate limits to prevent spam
- Wait a few seconds between commands if you hit limits

### Debug Mode

Enable debug mode in `.env`:
```env
DEBUG=true
```

This will show detailed error information in the console.

## 📚 Advanced Features

### Auto-DM Setup
```bash
!autodm set Welcome to our awesome server!
!autodm enable
```

### Auto-React Setup
```bash
!autoreact add 👍
!autoreact add ❤️  
!autoreact enable
```

### Message Logging
```bash
!logger start          # Log messages in current channel
!logger stop           # Stop logging
```

### Custom Templates
```bash
!template create welcome Welcome {user}! Enjoy your stay in {server}!
!template use welcome
```

## 🔒 Security Notes

- **Never share your token** with anyone
- Keep your `.env` file secure and don't commit it to version control
- Be careful with the `eval` and `shell` commands (owner-only for a reason)
- Use the selfbot responsibly to avoid detection
- Consider using a secondary Discord account

## 📈 Performance Tips

- The bot is designed to be lightweight and fast
- Monitor memory usage with `!perf`
- Restart the bot periodically for optimal performance
- Disable features you don't use to save resources

## 🚨 Legal Notice

This software is provided for educational purposes only. The developers are not responsible for:
- Discord account suspensions or bans
- Violation of Discord's Terms of Service
- Any misuse of this software
- Any damages resulting from the use of this software

Use at your own risk and responsibility.

## 📞 Support

If you encounter issues:
1. Check this installation guide
2. Review the error messages carefully
3. Ensure all dependencies are installed correctly
4. Verify your token and configuration

## 🔄 Updates

To update the selfbot:
1. Backup your `.env` file and any custom modifications
2. Download the latest version
3. Run `npm install` to update dependencies
4. Restore your configuration

---

**Remember: This is for educational purposes only. Use responsibly!** 🎓
