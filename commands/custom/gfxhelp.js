/**
 * GFX Help Command - AI Image Generation Guide
 * Created by Sanyam Suyal
 * 
 * Comprehensive guide for the AI image generation features
 */

export default {
    name: 'gfxhelp',
    description: 'Complete guide for AI image generation commands',
    category: 'custom',
    aliases: ['gfxguide', 'aigfx'],
    cooldown: 5,
    usage: '!gfxhelp',

    async execute(client, message, args) {
        try {
            const helpText = `\`\`\`yaml
🎨 AI Image Generation Guide - Created by Sanyam Suyal

📋 AVAILABLE COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 !gfx <style> <text>
   Generate AI images with custom styles
   
🗂️ !gfxcache
   View your last 5 generated images
   
ℹ️ !gfxhelp  
   Show this comprehensive guide

🎨 AVAILABLE STYLES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• anime      - Anime/manga style artwork
• cyberpunk  - Futuristic neon aesthetics  
• fantasy    - Medieval/magical themes
• realistic  - Photorealistic renders
• logo       - Clean professional logos
• cartoon    - Cartoon/comic style art
• art        - Artistic/painterly style

📝 USAGE EXAMPLES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• !gfx anime "Lost Squad"
• !gfx cyberpunk "Neon City"
• !gfx fantasy "Dragon Knight" 
• !gfx realistic "Cool Avatar"
• !gfx logo "My Brand Name"
• !gfx cartoon "Happy Character"
• !gfx art "Beautiful Landscape"

⚡ TECHNICAL FEATURES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Powered by Together.ai API
✅ High-quality 512x512 images
✅ Smart prompt enhancement  
✅ Automatic negative prompts
✅ Image caching (last 5 per user)
✅ Multiple AI models support
✅ Professional error handling
✅ 10-30 second generation time

🔧 SETUP REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Get API key: https://api.together.xyz/settings/api-keys
2. Add to .env: TOGETHER_API_KEY=your_key_here
3. Restart the bot
4. Start generating amazing images!

💡 PRO TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Use descriptive text for better results
• Try different styles for variety
• Check !gfxcache to see your history
• Each generation takes 10-30 seconds
• Images are cached for quick access

⚠️ RATE LIMITS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• 10 second cooldown between generations
• Respects Together.ai API limits
• Auto-retry on temporary failures
• Professional error messages

Created by Sanyam Suyal | Powered by Together.ai
\`\`\``;

            await message.channel.send(helpText);

        } catch (error) {
            console.error('Error in gfxhelp command:', error);
            await message.channel.send('❌ **Error**: Failed to display help guide.');
        }
    }
};
