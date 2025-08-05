import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Quick fix script to update all embed sends
const fixEmbedSends = () => {
  const commandsPath = './commands';
  const categories = readdirSync(commandsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let fixedFiles = 0;

  for (const category of categories) {
    const categoryPath = join(commandsPath, category);
    const commandFiles = readdirSync(categoryPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = join(categoryPath, file);
      let content = readFileSync(filePath, 'utf8');
      
      // Fix embed sends
      const originalContent = content;
      content = content.replace(
        /message\.channel\.send\(\{\s*embeds:\s*\[([^\]]+)\]\s*\}\)/g,
        'message.channel.send({ content: \' \', embeds: [$1] })'
      );
      
      content = content.replace(
        /channel\.send\(\{\s*embeds:\s*\[([^\]]+)\]\s*\}\)/g,
        'channel.send({ content: \' \', embeds: [$1] })'
      );

      if (content !== originalContent) {
        writeFileSync(filePath, content);
        fixedFiles++;
        console.log(`Fixed ${filePath}`);
      }
    }
  }

  console.log(`Fixed ${fixedFiles} files`);
};

// Run the fix if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fixEmbedSends();
}
