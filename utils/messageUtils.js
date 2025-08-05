/**
 * Utility functions for Discord message handling
 */

export const sendEmbed = async (channel, embed) => {
  try {
    // Discord.js-selfbot-v13 requires content field to not be undefined
    return await channel.send({ content: ' ', embeds: [embed] });
  } catch (error) {
    // Fallback to plain text if embed fails
    console.error('Embed send failed, falling back to text:', error.message);
    const fallbackText = `**${embed.title || 'Response'}**\n${embed.description || 'No content'}`;
    return await channel.send(fallbackText);
  }
};

export const sendEmbeds = async (channel, embeds) => {
  try {
    return await channel.send({ content: ' ', embeds });
  } catch (error) {
    console.error('Multiple embeds send failed:', error.message);
    // Send as separate messages if needed
    for (const embed of embeds) {
      await sendEmbed(channel, embed);
    }
  }
};

export const safeReply = async (message, content) => {
  try {
    return await message.reply(content);
  } catch (error) {
    // Fallback to channel send if reply fails
    return await message.channel.send(content);
  }
};

export const safeSend = async (channel, content) => {
  try {
    if (typeof content === 'string') {
      return await channel.send(content);
    } else if (content.embeds) {
      return await sendEmbeds(channel, content.embeds);
    } else {
      return await channel.send({ content: ' ', ...content });
    }
  } catch (error) {
    console.error('Safe send failed:', error.message);
    return await channel.send('❌ Failed to send message.');
  }
};
