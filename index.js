import { Client } from 'discord.js-selfbot-v13';
import figlet from 'figlet';
import config from './config/config.js';
import { CommandHandler } from './handlers/commandHandler.js';
import { handleCooldown } from './utils/cooldown.js';
import { handleError } from './utils/errorHandler.js';
import { log, logSuccess, logError, logCommand, colors } from './utils/logger.js';

class SelfBot {
  constructor() {
    this.client = new Client();
    this.commandHandler = new CommandHandler(this.client);
    this.startTime = Date.now();
  }

  async initialize() {
    // Display banner
    console.clear();
    console.log(colors.command(figlet.textSync('SelfBot', { horizontalLayout: 'full' })));
    console.log(colors.info('Personal Discord Selfbot - Educational Use Only\n'));

    // Validate configuration
    if (!config.token) {
      logError(new Error('No token provided in .env file'));
      process.exit(1);
    }

    // Load commands
    await this.commandHandler.loadCommands();

    // Setup event listeners
    this.setupEventListeners();

    // Login
    try {
      await this.client.login(config.token);
    } catch (error) {
      logError(error, 'during login');
      process.exit(1);
    }
  }

  setupEventListeners() {
    this.client.on('ready', () => {
      logSuccess(`Logged in as ${this.client.user.tag}`);
      log(`Prefix: ${config.prefix}`, 'info');
      log(`Commands loaded: ${this.client.commands.size}`, 'info');
      log(`Guilds: ${this.client.guilds.cache.size}`, 'info');
      log('Bot is ready for use!', 'success');
    });

    this.client.on('messageCreate', async (message) => {
      try {
        // Check if this is a command message first
        const isCommand = message.author.id === this.client.user.id && message.content.startsWith(config.prefix);
        
        await this.handleMessage(message);
        await this.handleAutoFeatures(message, isCommand);
      } catch (error) {
        logError(error, 'in message handling');
        // Don't crash, just continue
      }
    });

    this.client.on('guildMemberAdd', async (member) => {
      try {
        await this.handleAutoDM(member);
      } catch (error) {
        logError(error, 'in auto DM');
      }
    });

    this.client.on('error', (error) => {
      logError(error, 'Client error');
    });

    this.client.on('warn', (warning) => {
      log(warning, 'warning');
    });

    // Global error handlers to prevent crashes
    process.on('unhandledRejection', (reason, promise) => {
      logError(new Error(`Unhandled Rejection: ${reason}`), 'Promise rejection');
    });

    process.on('uncaughtException', (error) => {
      logError(error, 'Uncaught exception - continuing...');
      // Don't exit, just log
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      log('Shutting down gracefully...', 'warning');
      this.client.destroy();
      process.exit(0);
    });
  }

  async handleMessage(message) {
    // Only respond to own messages
    if (message.author.id !== this.client.user.id) return;
    
    // Check for prefix
    if (!message.content.startsWith(config.prefix)) return;

    // Parse command and arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get command
    const command = this.commandHandler.getCommand(commandName);
    if (!command) return;

    // Check cooldown
    const cooldownResult = handleCooldown(
      command.name, 
      message.author.id, 
      (command.cooldown || config.commandCooldown) * 1000
    );

    if (cooldownResult.onCooldown) {
      try {
        const reply = await message.reply(`⏳ Please wait ${cooldownResult.timeLeft}s before using \`${command.name}\` again.`);
        setTimeout(() => reply.delete().catch(() => {}), 5000);
      } catch (error) {
        // Ignore errors when sending cooldown messages
      }
      return;
    }

    // Log command usage
    const guildName = message.guild ? message.guild.name : 'DM';
    logCommand(command.name, message.author.tag, guildName);

    // Execute command with better error handling
    try {
      await command.execute(this.client, message, args);
    } catch (error) {
      // Enhanced error handling
      console.error(`Command ${command.name} failed:`, error);
      await handleError(error, message, command.name);
      
      // Don't crash, just continue
    }
  }

  async handleAutoFeatures(message, isCommand = false) {
    // Handle AFK functionality for all users (not just own messages)
    try {
      // Get AFK command for handling
      const afkCommand = this.client.commands.get('afk');
      
      if (afkCommand) {
        // Check if someone mentioned an AFK user (but not the AFK user themselves)
        if (message.mentions.users.size > 0 && message.author.id !== this.client.user.id) {
          await afkCommand.handleMention(this.client, message);
        }
        
        // Check if an AFK user has returned (sent a message)
        // But EXCLUDE AFK-related commands to prevent auto-return when setting AFK
        if (this.client.afkUsers && this.client.afkUsers.has(message.author.id)) {
          // If it's not a command at all, user has returned
          if (!isCommand) {
            await afkCommand.checkReturn(this.client, message);
          } else {
            // If it's a command, check if it's AFK-related
            const isAFKCommand = message.content.toLowerCase().includes('afk') || 
                                message.content.toLowerCase().includes('away') ||
                                message.content.toLowerCase().includes('brb');
            
            // Only auto-return if it's NOT an AFK-related command
            if (!isAFKCommand) {
              await afkCommand.checkReturn(this.client, message);
            }
          }
        }
      }
    } catch (error) {
      // Ignore AFK errors to prevent crashes
      console.error('AFK handling error:', error);
    }

    // Skip own messages for other auto features
    if (message.author.id === this.client.user.id) return;

    // Auto-react feature
    if (this.client.autoReact?.enabled && this.client.autoReact.channels.has(message.channel.id)) {
      if (Math.random() < this.client.autoReact.probability) {
        const randomEmoji = this.client.autoReact.emojis[Math.floor(Math.random() * this.client.autoReact.emojis.length)];
        try {
          await message.react(randomEmoji);
        } catch (error) {
          // Ignore reaction errors
        }
      }
    }

    // Message logging feature
    if (this.client.loggedChannels?.has(message.channel.id)) {
      log(`[${message.guild?.name || 'DM'}] [#${message.channel.name || 'DM'}] ${message.author.tag}: ${message.content}`, 'info');
    }

    // AFK detection
    if (this.client.afkUsers?.has(message.author.id)) {
      const afkData = this.client.afkUsers.get(message.author.id);
      const duration = Date.now() - afkData.timestamp;
      const durationText = this.formatDuration(duration);
      
      this.client.afkUsers.delete(message.author.id);
      
      try {
        const welcomeBack = await message.channel.send(`👋 Welcome back **${message.author.username}**! You were AFK for ${durationText}.`);
        setTimeout(() => welcomeBack.delete().catch(() => {}), 5000);
      } catch (error) {
        // Ignore errors
      }
    }

    // Check for AFK mentions
    message.mentions.users.forEach(async (user) => {
      if (this.client.afkUsers?.has(user.id)) {
        const afkData = this.client.afkUsers.get(user.id);
        const duration = Date.now() - afkData.timestamp;
        const durationText = this.formatDuration(duration);
        
        try {
          const afkNotice = await message.channel.send(`💤 **${user.username}** is currently AFK: ${afkData.message} (${durationText} ago)`);
          setTimeout(() => afkNotice.delete().catch(() => {}), 10000);
        } catch (error) {
          // Ignore errors
        }
      }
    });
  }

  async handleAutoDM(member) {
    if (!this.client.autoDM?.enabled || !this.client.autoDM.guilds.has(member.guild.id)) return;

    try {
      // Wait a bit before sending DM
      setTimeout(async () => {
        try {
          await member.send(this.client.autoDM.message);
          log(`Auto-DM sent to ${member.user.tag} in ${member.guild.name}`, 'info');
        } catch (error) {
          logError(error, 'sending auto-DM');
        }
      }, 2000);
    } catch (error) {
      logError(error, 'handling auto-DM');
    }
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}

// Initialize and start the bot
const bot = new SelfBot();
bot.initialize().catch(error => {
  logError(error, 'during initialization');
  process.exit(1);
});
