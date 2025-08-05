/**
 * GFX Cache Command - View Generated Images
 * Created by Sanyam Suyal
 * 
 * Shows user's cached generated images
 */

export default {
    name: 'gfxcache',
    description: 'View your recently generated AI images',
    category: 'custom', 
    aliases: ['gcache', 'myimages'],
    cooldown: 3,
    usage: '!gfxcache',

    async execute(client, message, args) {
        try {
            // Get the gfx command to access cache methods
            const gfxCommand = client.commands.get('gfx');
            
            if (!gfxCommand) {
                return await message.channel.send('❌ **Error**: GFX command not found.');
            }

            // Show user's cached images
            await gfxCommand.showCache(message, message.author.id);

        } catch (error) {
            console.error('Error in gfxcache command:', error);
            await message.channel.send('❌ **Error**: Failed to retrieve cached images.');
        }
    }
};
