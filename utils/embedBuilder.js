/**
 * Professional Embed System - Works with discord.js-selfbot-v13
 * Creates beautiful, properly formatted embeds that actually send
 */

export class EmbedBuilder {
  constructor() {
    this.data = {
      title: null,
      description: null,
      color: null,
      fields: [],
      footer: null,
      thumbnail: null,
      image: null,
      timestamp: null,
      author: null
    };
  }

  setTitle(title) {
    this.data.title = title;
    return this;
  }

  setDescription(description) {
    this.data.description = description;
    return this;
  }

  setColor(color) {
    if (typeof color === 'string') {
      // Convert hex string to number
      this.data.color = parseInt(color.replace('#', ''), 16);
    } else {
      this.data.color = color;
    }
    return this;
  }

  addField(name, value, inline = false) {
    this.data.fields.push({ name, value, inline });
    return this;
  }

  setFooter(text, iconURL = null) {
    this.data.footer = { text, icon_url: iconURL };
    return this;
  }

  setThumbnail(url) {
    this.data.thumbnail = { url };
    return this;
  }

  setImage(url) {
    this.data.image = { url };
    return this;
  }

  setTimestamp(timestamp = new Date()) {
    this.data.timestamp = timestamp;
    return this;
  }

  setAuthor(name, iconURL = null, url = null) {
    this.data.author = { name, icon_url: iconURL, url };
    return this;
  }

  build() {
    return this.data;
  }
}

// Professional color palette
export const Colors = {
  // Primary colors
  PRIMARY: 0x5865F2,
  SUCCESS: 0x00FF00,
  WARNING: 0xFFFF00,
  ERROR: 0xFF0000,
  INFO: 0x00FFFF,
  
  // Professional palette
  DISCORD_BLURPLE: 0x5865F2,
  DISCORD_GREEN: 0x57F287,
  DISCORD_YELLOW: 0xFEE75C,
  DISCORD_RED: 0xED4245,
  DISCORD_FUCHSIA: 0xEB459E,
  
  // Material Design colors
  BLUE: 0x2196F3,
  GREEN: 0x4CAF50,
  ORANGE: 0xFF9800,
  PURPLE: 0x9C27B0,
  TEAL: 0x009688,
  PINK: 0xE91E63,
  
  // Professional grays
  DARK_GREY: 0x2F3136,
  LIGHT_GREY: 0x99AAB5,
  WHITE: 0xFFFFFF,
  BLACK: 0x000000
};

// Safe embed sender that works with selfbot
export const sendEmbed = async (channel, embed) => {
  try {
    // Simple approach - just send with embeds array
    const message = await channel.send({
      embeds: [embed]
    });
    return message;
  } catch (error) {
    console.error('Embed send failed:', error.message);
    
    // Try with content
    try {
      const message = await channel.send({
        content: '.',
        embeds: [embed]
      });
      return message;
    } catch (error2) {
      console.error('Embed with content failed:', error2.message);
      
      // Fallback to formatted text that looks professional
      const fallbackText = formatEmbedAsText(embed);
      return await channel.send(fallbackText);
    }
  }
};

// Convert embed to professional text format as fallback
const formatEmbedAsText = (embed) => {
  let text = '';
  
  if (embed.title) {
    text += `**═══ ${embed.title} ═══**\n`;
  }
  
  if (embed.description) {
    text += `${embed.description}\n`;
  }
  
  if (embed.fields && embed.fields.length > 0) {
    text += '\n';
    embed.fields.forEach(field => {
      text += `**${field.name}**\n${field.value}\n\n`;
    });
  }
  
  if (embed.footer) {
    text += `\n*${embed.footer.text}*`;
  }
  
  return text;
};

// Quick embed templates for common use cases
export const createSuccessEmbed = (title, description) => {
  return new EmbedBuilder()
    .setTitle(`✅ ${title}`)
    .setDescription(description)
    .setColor(Colors.SUCCESS)
    .setTimestamp()
    .build();
};

export const createErrorEmbed = (title, description) => {
  return new EmbedBuilder()
    .setTitle(`❌ ${title}`)
    .setDescription(description)
    .setColor(Colors.ERROR)
    .setTimestamp()
    .build();
};

export const createInfoEmbed = (title, description) => {
  return new EmbedBuilder()
    .setTitle(`ℹ️ ${title}`)
    .setDescription(description)
    .setColor(Colors.INFO)
    .setTimestamp()
    .build();
};

export const createWarningEmbed = (title, description) => {
  return new EmbedBuilder()
    .setTitle(`⚠️ ${title}`)
    .setDescription(description)
    .setColor(Colors.WARNING)
    .setTimestamp()
    .build();
};
