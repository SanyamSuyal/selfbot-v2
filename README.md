# 🤖 Advanced Discord Selfbot

**Created by: Sanyam Suyal**

A powerful, feature-rich Discord selfbot with 50+ commands designed for personal automation and entertainment. Built with modern JavaScript and a modular architecture for easy customization.

⚠️ **IMPORTANT DISCLAIMER**: This selfbot is strictly for educational and personal use only. Using selfbots violates Discord's Terms of Service and may result in account suspension or termination. The creator (Sanyam Suyal) and contributors are not responsible for any consequences. Use at your own risk and responsibility.

## ✨ Key Features

- 🎯 **50+ Professional Commands** across 6 organized categories
- 🏗️ **Modular Architecture** - Clean, maintainable code structure
- ⚡ **Smart Command Handler** with automatic loading and hot-reload
- 🛡️ **Advanced Error Handling** with crash protection
- 🎨 **Beautiful Console Output** with colored logging and activity tracking
- 🔐 **Secure Configuration** using environment variables
- 📊 **Performance Monitoring** and memory usage tracking
- 🚀 **Lightweight & Fast** - Optimized for performance
- 🎭 **Fun Prank Commands** - Entertainment features for friends
- 🔧 **Developer Tools** - Advanced utilities for power users

## 📂 Command Categories

### ⚙️ **Utility Commands**
Essential bot functions and information tools
- `!help` - Command center with categorized listings
- `!ping` - Bot latency and performance metrics
- `!uptime` - Bot runtime and system performance metrics
- `!userinfo` - Detailed user profiles and statistics
- `!serverinfo` - Comprehensive server information
- `!avatar` - High-quality avatar display with download links
- `!calc` - Advanced calculator with expression support
- `!remind` - Set personal reminders with flexible time formats
- `!reminders` - View active reminder system status

### 🎉 **Fun & Entertainment**
Commands for entertainment and social interaction
- `!meme` - Fresh memes from popular subreddits
- `!joke` - Random jokes and humor
- `!hack` - Fake hacking simulation (harmless prank)
- `!expose` - Funny fake "investigation" results
- `!quote` - Inspirational quotes with beautiful formatting

### 🔧 **Tool Commands**
Productivity and utility features
- `!massdelete` - Bulk message deletion with progress tracking
- `!weather` - Current weather information
- `!time` - World time zones and date information

### 👥 **Social Features**
Social automation and interaction tools
- Auto-reactions to specific channels
- Custom status management
- Friend list utilities

### 💻 **Developer Tools**
Advanced features for developers and power users
- `!eval` - Code execution environment
- `!shell` - System command execution
- `!crashtest` - Error handling and stability testing

### 🎨 **Custom Commands**
Specialized and unique features
- Custom templates and automation
- Webhook testing utilities
- Advanced formatting tools

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16.0.0 or higher
- A Discord account (use a secondary account recommended)
- Basic knowledge of Discord bots

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SanyamSuyal/discord-selfbot.git
   cd discord-selfbot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   
   Create a `.env` file in the root directory:
   ```env
   TOKEN=your_discord_token_here
   PREFIX=!
   OWNER_ID=your_user_id_here
   
   # Optional settings
   DEBUG=false
   COMMAND_COOLDOWN=2
   MAX_MESSAGE_DELETE=100
   ```

4. **Get Your Discord Token**
   - Open Discord in your browser
   - Press F12 to open Developer Tools
   - Go to Network tab
   - Send any message
   - Look for requests to `/api/v*/messages`
   - Find the `authorization` header - that's your token

5. **Start the Bot**
   ```bash
   npm start
   ```

## 📖 Command Usage Examples

```bash
!help                    # Show all available commands
!ping                    # Check bot performance
!userinfo @username      # Get detailed user information
!meme dankmemes         # Get memes from specific subreddit
!hack @friend           # Fun fake hacking prank
!expose @target         # Hilarious fake investigation
!massdelete 25          # Delete your last 25 messages
!weather London         # Get weather information
```

## 🛠️ Development & Customization

### Adding New Commands

1. Navigate to the appropriate category folder in `commands/`
2. Create a new `.js` file following this template:

```javascript
export default {
  name: 'yourcommand',
  description: 'What your command does',
  category: 'utility', // utility, fun, tools, social, developer, custom
  aliases: ['alias1', 'alias2'],
  cooldown: 3, // seconds
  usage: 'yourcommand [arguments]',

  async execute(client, message, args) {
    // Your command logic here
    await message.channel.send('Hello World!');
  }
};
```

3. Restart the bot to load the new command

### Project Structure
```
discord-selfbot/
├── commands/           # All bot commands organized by category
│   ├── utility/       # Basic utility commands
│   ├── fun/           # Entertainment commands
│   ├── tools/         # Productivity tools
│   ├── social/        # Social features
│   ├── developer/     # Advanced dev tools
│   └── custom/        # Custom specialized commands
├── handlers/          # Command and event handlers
├── utils/             # Utility functions and helpers
├── config/            # Configuration files
├── index.js           # Main bot file
└── package.json       # Dependencies and scripts
```

## ⚠️ Important Security & Legal Information

### Security Best Practices
- **Use a secondary Discord account** - Never use your main account
- **Keep your token private** - Never share or commit your token to version control
- **Use responsibly** - Respect Discord's rate limits and community guidelines
- **Stay updated** - Keep dependencies updated for security patches

### Legal Disclaimer
This project is created by **Sanyam Suyal** for educational purposes only. By using this software, you acknowledge that:

- Using selfbots violates Discord's Terms of Service
- Your account may be suspended or terminated
- The creator and contributors are not liable for any consequences
- This software is provided "as-is" without warranties
- You use this software at your own risk and responsibility

### Rate Limiting & Best Practices
- Commands have built-in cooldowns to prevent spam
- Mass operations (like message deletion) include delays
- The bot respects Discord's API rate limits
- Error handling prevents crashes and API abuse

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m "Add new feature"`
5. Push to your fork: `git push origin feature-name`
6. Create a Pull Request

### Contribution Guidelines
- Follow the existing code style and structure
- Add proper error handling to new commands
- Include clear documentation for new features
- Test commands before submitting
- Respect the educational purpose of this project

## 🐛 Issues & Support

### Reporting Issues
If you encounter bugs or have feature requests:
1. Check existing issues first
2. Create a detailed issue report
3. Include error messages and steps to reproduce
4. Specify your Node.js version and operating system

### Getting Help
- Read the documentation thoroughly
- Check the troubleshooting section
- Search existing issues for solutions
- Join our community discussions

## 📜 License

MIT License - Created by **Sanyam Suyal**

Copyright (c) 2025 Sanyam Suyal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 🙏 Acknowledgments

- **Created with ❤️ by Sanyam Suyal**
- Built with Node.js and discord.js-selfbot-v13
- Inspired by the Discord development community
- Thanks to all contributors and testers

---

⭐ **If you find this project helpful, please give it a star on GitHub!**

🔗 **Repository:** https://github.com/SanyamSuyal/discord-selfbot
