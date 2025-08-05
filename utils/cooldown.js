import { Collection } from 'discord.js-selfbot-v13';

const cooldowns = new Collection();

export const handleCooldown = (commandName, userId, cooldownTime = 2000) => {
  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  
  if (timestamps.has(userId)) {
    const expirationTime = timestamps.get(userId) + cooldownTime;
    
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return {
        onCooldown: true,
        timeLeft: timeLeft.toFixed(1)
      };
    }
  }

  timestamps.set(userId, now);
  setTimeout(() => timestamps.delete(userId), cooldownTime);

  return {
    onCooldown: false,
    timeLeft: 0
  };
};

export const clearCooldowns = () => {
  cooldowns.clear();
};
