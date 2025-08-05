import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default {
  name: 'shell',
  description: 'Execute shell commands (Owner only)',
  category: 'developer',
  aliases: ['cmd', 'terminal', 'bash'],
  cooldown: 2,
  usage: 'shell <command>',

  async execute(client, message, args) {
    // Owner-only check
    if (message.author.id !== process.env.OWNER_ID) {
      return message.channel.send('❌ This command is restricted to the bot owner.');
    }

    if (!args.length) {
      return message.channel.send('❌ Please provide a command to execute.\n**Example:** `!shell ls -la` or `!shell dir`');
    }

    const command = args.join(' ');
    
    // Security check - block dangerous commands
    const dangerousCommands = [
      'rm -rf', 'del /f', 'format', 'shutdown', 'reboot', 'halt',
      'sudo rm', 'rmdir /s', 'diskpart', 'fdisk', '> /dev/null',
      'dd if=', 'mkfs', 'wipefs'
    ];

    if (dangerousCommands.some(dangerous => command.toLowerCase().includes(dangerous))) {
      return message.channel.send('❌ Dangerous command blocked for security reasons.');
    }

    const statusMsg = await message.channel.send('⏳ Executing command...');

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 10000, // 10 second timeout
        maxBuffer: 1024 * 1024 // 1MB max buffer
      });

      let output = stdout || stderr || 'Command executed with no output';
      
      // Truncate if too long
      if (output.length > 1900) {
        output = output.substring(0, 1900) + '\n... (truncated)';
      }

      const embed = {
        title: '💻 Shell Command Execution',
        fields: [
          {
            name: '📥 Command',
            value: `\`\`\`bash\n${command}\n\`\`\``,
            inline: false
          },
          {
            name: '📤 Output',
            value: `\`\`\`\n${output}\n\`\`\``,
            inline: false
          }
        ],
        color: stderr ? 0xffff00 : 0x00ff00,
        timestamp: new Date(),
        footer: {
          text: `Executed by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL()
        }
      };

      statusMsg.edit({ content: '', embeds: [embed] });

    } catch (error) {
      const embed = {
        title: '❌ Shell Command Error',
        fields: [
          {
            name: '📥 Command',
            value: `\`\`\`bash\n${command}\n\`\`\``,
            inline: false
          },
          {
            name: '❌ Error',
            value: `\`\`\`\n${error.message}\n\`\`\``,
            inline: false
          }
        ],
        color: 0xff0000,
        timestamp: new Date()
      };

      statusMsg.edit({ content: '', embeds: [embed] });
    }
  }
};
