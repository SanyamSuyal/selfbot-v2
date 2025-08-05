/**
 * GFX Command - AI Image Generation
 * Created by Sanyam Suyal
 * 
 * Generates AI images using Together.ai API with anime/style models
 */

import fetch from 'node-fetch';

// Cache for storing user's last 5 generated images
const userImageCache = new Map();

export default {
    name: 'gfx',
    description: 'Generate AI images with custom styles using Together.ai',
    category: 'custom',
    aliases: ['generate', 'ai', 'image'],
    cooldown: 10, // Higher cooldown for AI generation
    usage: '!gfx <style> <text> [description]',
    examples: [
        '!gfx anime "Lost Squad" dark background, glowing eyes',
        '!gfx gaming "AKSHAT" dynamic pose, intense lighting',
        '!gfx cyberpunk "Neon City" with flying cars and rain',
        '!gfx profile "Ghost" cool mask, dramatic lighting',
        '!gfx banner "Infinity" epic background, professional design',
        '!gfx fantasy "Dragon Knight" epic battle scene, medieval armor'
    ],

    async execute(client, message, args) {
        try {
            // Check if Together.ai API key is configured
            if (!process.env.TOGETHER_API_KEY) {
                return await message.channel.send('❌ **Error**: Together.ai API key not configured. Please add `TOGETHER_API_KEY` to your .env file.');
            }

            // Parse arguments
            if (args.length < 2) {
                const usage = `\`\`\`yaml
🎨 GFX Command - AI Image Generation

Usage: !gfx <style> <text> [description]

📝 Examples:
• !gfx anime "Lost Squad"
• !gfx gaming "AKSHAT" dynamic pose, intense lighting
• !gfx profile "Ghost" cool mask, dramatic lighting  
• !gfx banner "Infinity" epic background, professional design
• !gfx cyberpunk "Neon City" with flying cars and rain
• !gfx fantasy "Dragon Knight" epic battle, medieval armor

🎯 Available Styles:
• anime - Professional anime gaming banners
• cyberpunk - Futuristic neon gaming aesthetics  
• fantasy - Epic medieval/magical gaming art
• realistic - Photorealistic gaming avatars
• logo - Clean professional gaming logos
• cartoon - Professional cartoon gaming mascots
• art - Artistic gaming banners
• gaming - Dynamic esports-style banners
• profile - Professional gaming profile pictures
• banner - Epic gaming team banners

💡 Pro Tips:
• Add descriptions for better results!
• Use specific details like "dark background", "glowing eyes"
• Mention lighting: "dramatic lighting", "neon glow" 
• Add mood: "epic", "intense", "professional"
• For gaming style: try "dynamic pose", "action scene"

⚡ Powered by Together.ai FLUX Models
\`\`\``;
                
                return await message.channel.send(usage);
            }

            const style = args[0].toLowerCase();
            
            // Parse text and description
            const restArgs = args.slice(1).join(' ');
            let text, description;
            
            // Check if there are quotes to separate text from description
            const quotedTextMatch = restArgs.match(/^["']([^"']+)["']\s*(.*)$/);
            if (quotedTextMatch) {
                text = quotedTextMatch[1];
                description = quotedTextMatch[2].trim();
            } else {
                // If no quotes, treat first word as text, rest as description
                const parts = restArgs.split(' ');
                text = parts[0];
                description = parts.slice(1).join(' ').trim();
            }

            // Send initial processing message
            const processingMsg = await message.channel.send('🎨 **Generating your image...** This may take 10-30 seconds.');

            // Generate the image
            const result = await this.generateImage(style, text, description);

            if (result.success) {
                // Cache the image for the user
                this.cacheImage(message.author.id, result);

                // Create success response
                const response = `\`\`\`yaml
🎨 Your GFX is Ready!

Style: ${style}
Text: "${text}"
${description ? `Description: "${description}"` : ''}
Model: ${result.model}
Prompt: ${result.prompt.slice(0, 100)}...

Generated using Together.ai
\`\`\`

**Image URL**: ${result.imageUrl}`;

                await processingMsg.edit(response);

            } else {
                await processingMsg.edit(`❌ **Generation Failed**: ${result.error}`);
            }

        } catch (error) {
            console.error('Error in gfx command:', error);
            await message.channel.send('❌ **Error**: Failed to generate image. Please try again later.');
        }
    },

    async generateImage(style, text, description = '') {
        try {
            // Style-specific models and prompts
            const styleConfig = this.getStyleConfig(style, text, description);

            const requestBody = {
                model: styleConfig.model,
                prompt: styleConfig.prompt,
                width: 1024,
                height: 1024,
                steps: 4, // FLUX Schnell uses 4 steps for speed
                n: 1
            };

            console.log(`Generating image with Together.ai: ${styleConfig.prompt}`);

            const response = await fetch('https://api.together.xyz/images/generations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`API Error (${response.status}): ${errorData}`);
            }

            const data = await response.json();

            if (data.data && data.data[0] && data.data[0].url) {
                return {
                    success: true,
                    imageUrl: data.data[0].url,
                    prompt: styleConfig.prompt,
                    model: styleConfig.model,
                    style: style,
                    text: text,
                    timestamp: Date.now()
                };
            } else {
                throw new Error('No image URL in response');
            }

        } catch (error) {
            console.error('Together.ai API Error:', error);
            return {
                success: false,
                error: error.message.includes('timeout') ? 'Request timed out. Please try again.' : 
                       error.message.includes('API Error') ? 'API service unavailable. Try again later.' :
                       'Generation failed. Please check your prompt and try again.'
            };
        }
    },

    getStyleConfig(style, text, description = '') {
        // Add description to the prompt if provided
        const descriptionPart = description ? `, ${description}` : '';
        
        const configs = {
            anime: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional anime gaming banner with text "${text}"${descriptionPart}, high-quality anime character, dynamic pose, cinematic lighting, vibrant colors, detailed background, professional typography overlay, gaming aesthetic, masterpiece artwork, 4K quality, anime gaming logo style, dramatic composition, glowing effects`
            },
            cyberpunk: {
                model: "black-forest-labs/FLUX.1-schnell-Free", 
                prompt: `Professional cyberpunk gaming banner with text "${text}"${descriptionPart}, futuristic character, neon lights, holographic effects, dark atmosphere with bright accents, sci-fi aesthetic, high-tech design, cyberpunk 2077 style, cinematic composition, glowing typography, professional gaming logo design`
            },
            fantasy: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Epic fantasy gaming banner with text "${text}"${descriptionPart}, fantasy character, magical atmosphere, medieval fantasy setting, mystical elements, epic fantasy art, detailed illustration, enchanted design, dramatic lighting, professional gaming aesthetic, cinematic quality`
            },
            realistic: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional realistic gaming avatar with text "${text}"${descriptionPart}, high quality photography, professional lighting, detailed realistic rendering, sharp focus, ultra-realistic, cinematic portrait, gaming profile picture style, professional design`
            },
            logo: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional gaming logo design with text "${text}"${descriptionPart}, minimalist design, modern typography, gaming aesthetic, brand identity, vector style, professional esports logo, clean design, high contrast, gaming team branding`
            },
            cartoon: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional cartoon gaming character with text "${text}"${descriptionPart}, colorful cartoon art, fun and playful design, animated style, bright colors, cheerful aesthetic, gaming mascot style, professional cartoon design`
            },
            art: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional artistic gaming banner with text "${text}"${descriptionPart}, painterly style, artistic composition, creative design, beautiful art piece, masterpiece quality, gaming artwork, cinematic style, professional design`
            },
            gaming: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional gaming banner with text "${text}"${descriptionPart}, dynamic gaming character, intense action pose, dramatic lighting, high-quality gaming aesthetic, esports style, professional tournament banner, cinematic composition, glowing effects, 4K quality`
            },
            profile: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional gaming profile picture with text "${text}"${descriptionPart}, cool character portrait, gaming avatar style, professional design, high contrast, dramatic lighting, gaming profile aesthetic, clean typography, modern design`
            },
            banner: {
                model: "black-forest-labs/FLUX.1-schnell-Free",
                prompt: `Professional gaming banner design with text "${text}"${descriptionPart}, epic gaming composition, dynamic character, professional typography overlay, gaming team banner style, high-quality design, cinematic lighting, esports aesthetic`
            }
        };

        // Default to anime style if unknown style
        return configs[style] || configs.anime;
    },

    cacheImage(userId, imageData) {
        try {
            if (!userImageCache.has(userId)) {
                userImageCache.set(userId, []);
            }

            const userCache = userImageCache.get(userId);
            userCache.unshift(imageData); // Add to beginning

            // Keep only last 5 images
            if (userCache.length > 5) {
                userCache.splice(5);
            }

            console.log(`Cached image for user ${userId}. Cache size: ${userCache.length}`);
        } catch (error) {
            console.error('Error caching image:', error);
        }
    },

    getUserCache(userId) {
        return userImageCache.get(userId) || [];
    },

    // Bonus: Get user's cached images
    async showCache(message, userId) {
        const cache = this.getUserCache(userId);
        
        if (cache.length === 0) {
            return await message.channel.send('📂 **No cached images found.** Generate some images first!');
        }

        let cacheList = `📂 **Your Recent Generated Images (${cache.length}/5):**\n\n`;
        
        cache.forEach((img, index) => {
            const timeAgo = Math.floor((Date.now() - img.timestamp) / 60000);
            cacheList += `${index + 1}. **${img.style}** - "${img.text}" *(${timeAgo}m ago)*\n`;
            cacheList += `   ${img.imageUrl}\n\n`;
        });

        await message.channel.send(cacheList);
    }
};
