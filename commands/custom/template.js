export default {
  name: 'template',
  description: 'Create and use custom message templates',
  category: 'custom',
  aliases: ['tmpl', 'msg'],
  cooldown: 2,
  usage: 'template <create|use|list|delete> [name] [content]',

  async execute(client, message, args) {
    if (!client.templates) {
      client.templates = new Map();
    }

    if (!args[0]) {
      return message.channel.send('❌ Please specify an action.\n**Usage:** `!template create|use|list|delete [name] [content]`');
    }

    const action = args[0].toLowerCase();

    switch (action) {
      case 'create':
      case 'add':
        if (!args[1] || !args[2]) {
          return message.channel.send('❌ Please provide a template name and content.\n**Example:** `!template create welcome Welcome to our server, {user}!`');
        }

        const templateName = args[1].toLowerCase();
        const templateContent = args.slice(2).join(' ');

        if (templateContent.length > 1500) {
          return message.channel.send('❌ Template content is too long. Maximum 1500 characters.');
        }

        client.templates.set(templateName, {
          content: templateContent,
          createdBy: message.author.id,
          createdAt: new Date(),
          uses: 0
        });

        message.channel.send(`✅ Template **${templateName}** created successfully!\n📝 Content: "${templateContent}"`);
        break;

      case 'use':
      case 'send':
        if (!args[1]) {
          return message.channel.send('❌ Please provide a template name.\n**Example:** `!template use welcome`');
        }

        const useTemplateName = args[1].toLowerCase();
        const template = client.templates.get(useTemplateName);

        if (!template) {
          return message.channel.send(`❌ Template **${useTemplateName}** not found. Use \`!template list\` to see available templates.`);
        }

        // Replace placeholders
        let content = template.content;
        content = content.replace(/{user}/g, message.author.toString());
        content = content.replace(/{username}/g, message.author.username);
        content = content.replace(/{tag}/g, message.author.tag);
        content = content.replace(/{server}/g, message.guild ? message.guild.name : 'DM');
        content = content.replace(/{channel}/g, message.channel.name || 'DM');
        content = content.replace(/{date}/g, new Date().toLocaleDateString());
        content = content.replace(/{time}/g, new Date().toLocaleTimeString());

        // Increment usage counter
        template.uses++;
        client.templates.set(useTemplateName, template);

        message.channel.send(content);

        // Delete the command message
        setTimeout(() => {
          message.delete().catch(() => {});
        }, 1000);
        break;

      case 'list':
        if (client.templates.size === 0) {
          return message.channel.send('❌ No templates found. Create one with `!template create <name> <content>`');
        }

        const templateList = Array.from(client.templates.entries()).map(([name, data]) => {
          const creator = client.users.cache.get(data.createdBy);
          return `**${name}** - Used ${data.uses} times (by ${creator ? creator.username : 'Unknown'})`;
        });

        const embed = {
          title: '📋 Available Templates',
          description: templateList.join('\n'),
          fields: [
            {
              name: '🔧 Placeholders',
              value: '`{user}` - Mention user\n`{username}` - Username\n`{tag}` - User tag\n`{server}` - Server name\n`{channel}` - Channel name\n`{date}` - Current date\n`{time}` - Current time',
              inline: false
            }
          ],
          color: 0x00ff00,
          timestamp: new Date(),
          footer: {
            text: `Total templates: ${client.templates.size}`,
            icon_url: message.author.displayAvatarURL()
          }
        };

        message.channel.send({ embeds: [embed] });
        break;

      case 'delete':
      case 'remove':
        if (!args[1]) {
          return message.channel.send('❌ Please provide a template name to delete.\n**Example:** `!template delete welcome`');
        }

        const deleteTemplateName = args[1].toLowerCase();
        const templateToDelete = client.templates.get(deleteTemplateName);

        if (!templateToDelete) {
          return message.channel.send(`❌ Template **${deleteTemplateName}** not found.`);
        }

        // Only allow deletion by creator or owner
        if (templateToDelete.createdBy !== message.author.id && message.author.id !== process.env.OWNER_ID) {
          return message.channel.send('❌ You can only delete templates you created.');
        }

        client.templates.delete(deleteTemplateName);
        message.channel.send(`✅ Template **${deleteTemplateName}** deleted successfully.`);
        break;

      case 'info':
        if (!args[1]) {
          return message.channel.send('❌ Please provide a template name.\n**Example:** `!template info welcome`');
        }

        const infoTemplateName = args[1].toLowerCase();
        const infoTemplate = client.templates.get(infoTemplateName);

        if (!infoTemplate) {
          return message.channel.send(`❌ Template **${infoTemplateName}** not found.`);
        }

        const creator = client.users.cache.get(infoTemplate.createdBy);
        
        const infoEmbed = {
          title: `📋 Template: ${infoTemplateName}`,
          fields: [
            {
              name: '📝 Content',
              value: infoTemplate.content,
              inline: false
            },
            {
              name: '👤 Created By',
              value: creator ? creator.tag : 'Unknown',
              inline: true
            },
            {
              name: '📅 Created At',
              value: infoTemplate.createdAt.toLocaleDateString(),
              inline: true
            },
            {
              name: '📊 Uses',
              value: infoTemplate.uses.toString(),
              inline: true
            }
          ],
          color: 0x00ff00,
          timestamp: new Date()
        };

        message.channel.send({ embeds: [infoEmbed] });
        break;

      default:
        message.channel.send('❌ Invalid action. Use: `create`, `use`, `list`, `delete`, or `info`');
    }
  }
};
