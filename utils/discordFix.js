/**
 * Discord Message Helper - Fixes embed sending issues
 */

// Override the default channel.send method to automatically fix embed issues
export const patchChannelSend = (client) => {
  const originalSend = client.channels.cache.get('0')?.constructor.prototype.send;
  
  if (originalSend) {
    client.channels.cache.get('0').constructor.prototype.send = function(options) {
      // If sending embeds without content, add a space
      if (options && typeof options === 'object' && options.embeds && !options.content) {
        options.content = ' ';
      }
      
      return originalSend.call(this, options);
    };
  }
};

// Safe embed sender that always works
export const sendEmbedSafe = async (channel, embedData) => {
  try {
    // Ensure we always have content when sending embeds
    const messageOptions = {
      content: ' ', // Always include content
      embeds: Array.isArray(embedData) ? embedData : [embedData]
    };
    
    return await channel.send(messageOptions);
  } catch (error) {
    console.error('Embed send failed, trying text fallback:', error.message);
    
    // Fallback to text message
    const embed = Array.isArray(embedData) ? embedData[0] : embedData;
    const fallbackText = `**${embed.title || 'Response'}**\n${embed.description || 'No content available'}`;
    
    try {
      return await channel.send(fallbackText);
    } catch (fallbackError) {
      console.error('Even text fallback failed:', fallbackError.message);
      throw fallbackError;
    }
  }
};
