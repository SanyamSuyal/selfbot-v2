export default {
  name: 'codefmt',
  description: 'Format code with syntax highlighting',
  category: 'tools',
  aliases: ['format', 'codeformat', 'highlight'],
  cooldown: 2,
  usage: 'codefmt <language> <code>',

  async execute(client, message, args) {
    if (args.length < 2) {
      return message.channel.send('❌ Please provide a language and code to format.\n**Example:** `!codefmt javascript console.log("Hello World");`\n**Supported:** js, py, html, css, json, xml, sql, etc.');
    }

    const language = args[0].toLowerCase();
    const code = args.slice(1).join(' ');

    // Language aliases
    const languageMap = {
      'js': 'javascript',
      'py': 'python',
      'ts': 'typescript',
      'cpp': 'cpp',
      'c++': 'cpp',
      'cs': 'csharp',
      'c#': 'csharp',
      'rb': 'ruby',
      'php': 'php',
      'go': 'go',
      'rs': 'rust',
      'java': 'java',
      'kt': 'kotlin',
      'swift': 'swift',
      'dart': 'dart',
      'r': 'r',
      'scala': 'scala',
      'sh': 'bash',
      'bash': 'bash',
      'powershell': 'powershell',
      'ps1': 'powershell',
      'yaml': 'yaml',
      'yml': 'yaml',
      'toml': 'toml',
      'ini': 'ini',
      'conf': 'ini'
    };

    const finalLanguage = languageMap[language] || language;

    // Validate code length
    if (code.length > 1500) {
      return message.channel.send('❌ Code is too long. Maximum 1500 characters allowed.');
    }

    if (!code.trim()) {
      return message.channel.send('❌ No code provided to format.');
    }

    // Basic code formatting/cleaning
    let formattedCode = code;
    
    // Remove extra whitespace and normalize line endings
    formattedCode = formattedCode.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Simple indentation for common languages
    if (['javascript', 'python', 'json'].includes(finalLanguage)) {
      try {
        if (finalLanguage === 'json') {
          // Try to parse and prettify JSON
          const parsed = JSON.parse(formattedCode);
          formattedCode = JSON.stringify(parsed, null, 2);
        }
      } catch (error) {
        // If JSON parsing fails, keep original
      }
    }

    const embed = {
      title: `🔧 Formatted Code (${finalLanguage})`,
      description: `\`\`\`${finalLanguage}\n${formattedCode}\n\`\`\``,
      color: 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: `Formatted by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL()
      }
    };

    // Check if embed description is too long
    if (embed.description.length > 4096) {
      return message.channel.send('❌ Formatted code is too long for embed. Try with shorter code.');
    }

    try {
      await message.channel.send({ embeds: [embed] });
      
      // Delete original command
      setTimeout(() => {
        message.delete().catch(() => {});
      }, 1000);
    } catch (error) {
      message.channel.send('❌ Failed to send formatted code. The content might be too large.');
    }
  }
};
