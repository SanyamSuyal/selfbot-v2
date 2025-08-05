import { readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';
import { Collection } from 'discord.js-selfbot-v13';
import { log, logSuccess, logError } from '../utils/logger.js';

export class CommandHandler {
  constructor(client) {
    this.client = client;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.categories = new Collection();
  }

  async loadCommands() {
    const commandsPath = './commands';
    let totalCommands = 0;

    try {
      const categories = readdirSync(commandsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const category of categories) {
        const categoryPath = join(commandsPath, category);
        const commandFiles = readdirSync(categoryPath).filter(file => file.endsWith('.js'));

        if (!this.categories.has(category)) {
          this.categories.set(category, []);
        }

        for (const file of commandFiles) {
          try {
            const filePath = join(process.cwd(), categoryPath, file);
            const fileURL = pathToFileURL(filePath).href;
            
            // Clear module cache for hot reloading
            delete import.meta.cache?.[fileURL];
            
            const commandModule = await import(fileURL);
            const command = commandModule.default;

            if (!command || !command.name) {
              logError(new Error(`Command file ${file} is missing name or default export`));
              continue;
            }

            // Set category if not defined
            if (!command.category) {
              command.category = category;
            }

            // Register command
            this.commands.set(command.name, command);
            this.categories.get(category).push(command);

            // Register aliases
            if (command.aliases && Array.isArray(command.aliases)) {
              for (const alias of command.aliases) {
                this.aliases.set(alias, command.name);
              }
            }

            totalCommands++;
          } catch (error) {
            logError(error, `loading command ${file}`);
          }
        }
      }

      this.client.commands = this.commands;
      this.client.categories = this.categories;
      
      logSuccess(`Successfully loaded ${totalCommands} commands across ${categories.length} categories`);
      
    } catch (error) {
      logError(error, 'loading commands');
    }
  }

  async reloadCommand(commandName) {
    const command = this.commands.get(commandName) || this.commands.get(this.aliases.get(commandName));
    
    if (!command) {
      throw new Error(`Command ${commandName} not found`);
    }

    // Remove from collections
    this.commands.delete(command.name);
    if (command.aliases) {
      for (const alias of command.aliases) {
        this.aliases.delete(alias);
      }
    }

    // Remove from category
    const categoryCommands = this.categories.get(command.category);
    if (categoryCommands) {
      const index = categoryCommands.findIndex(cmd => cmd.name === command.name);
      if (index > -1) {
        categoryCommands.splice(index, 1);
      }
    }

    // Reload the command
    await this.loadCommands();
    
    return `Command ${commandName} reloaded successfully`;
  }

  getCommand(name) {
    return this.commands.get(name) || this.commands.get(this.aliases.get(name));
  }
}
