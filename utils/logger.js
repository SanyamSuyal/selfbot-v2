import chalk from 'chalk';

export const colors = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.cyan,
  command: chalk.magenta,
  user: chalk.blue,
  system: chalk.gray
};

export const log = (message, type = 'info') => {
  const timestamp = new Date().toLocaleTimeString();
  const coloredMessage = colors[type] ? colors[type](message) : message;
  console.log(`${colors.system(`[${timestamp}]`)} ${coloredMessage}`);
};

export const logCommand = (commandName, username, guildName = 'DM') => {
  log(`Command "${commandName}" used by ${username} in ${guildName}`, 'command');
};

export const logError = (error, context = '') => {
  log(`Error ${context}: ${error.message}`, 'error');
  if (process.env.DEBUG === 'true') {
    console.error(error.stack);
  }
};

export const logSuccess = (message) => {
  log(message, 'success');
};

export const logWarning = (message) => {
  log(message, 'warning');
};
