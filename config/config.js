import { config } from 'dotenv';
config();

export default {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX || '!',
  ownerId: process.env.OWNER_ID,
  debug: process.env.DEBUG === 'true',
  commandCooldown: parseInt(process.env.COMMAND_COOLDOWN) || 2,
  maxMessageDelete: parseInt(process.env.MAX_MESSAGE_DELETE) || 100,
  
  // Command categories
  categories: {
    utility: '⚙️ Utility',
    fun: '🎉 Fun',
    tools: '🔧 Tools', 
    social: '👥 Social',
    developer: '💻 Developer',
    custom: '🎨 Custom'
  },

  // Colors for console output
  colors: {
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffff00',
    info: '#00ffff',
    command: '#ff00ff'
  }
};
