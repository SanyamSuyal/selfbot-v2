import { logError } from './logger.js';

export const handleError = async (error, message, commandName = 'Unknown') => {
  logError(error, `in command ${commandName}`);
  
  // Enhanced error messages
  const errorMessages = {
    'Missing Permissions': '❌ **Permission Error** - Missing required permissions.',
    'Unknown Message': '❌ **Message Error** - Message not found or already deleted.',
    'Cannot send messages': '❌ **Channel Error** - Cannot send messages in this channel.',
    'Cannot send an empty message': '❌ **Content Error** - Message content is invalid.',
    'Unknown Channel': '❌ **Channel Error** - Channel not found or inaccessible.',
    'Unknown Guild': '❌ **Server Error** - Server not found.',
    'Unknown User': '❌ **User Error** - User not found.',
    'Rate limited': '❌ **Rate Limit** - Too many requests. Please wait and try again.',
    'Invalid Form Body': '❌ **Input Error** - Invalid input provided.',
    'Request failed': '❌ **Network Error** - Request failed. Check your connection.',
    'fetch failed': '❌ **Network Error** - Failed to fetch data from external service.',
    default: '❌ **Command Error** - An unexpected error occurred.'
  };

  // Find matching error message
  let errorMessage = errorMessages.default;
  for (const [key, msg] of Object.entries(errorMessages)) {
    if (error.message && error.message.includes(key)) {
      errorMessage = msg;
      break;
    }
  }

  // Add additional context for debugging (without crashing)
  if (process.env.DEBUG === 'true') {
    errorMessage += `\n\`\`\`\n${error.message}\n\`\`\``;
  }
  
  try {
    if (message && message.channel) {
      await message.channel.send(errorMessage);
    }
  } catch (sendError) {
    logError(sendError, 'while sending error message');
    // Don't try to send another error message, just log it
  }
};

export const safeExecute = async (fn, message, commandName) => {
  try {
    await fn();
  } catch (error) {
    await handleError(error, message, commandName);
  }
};
