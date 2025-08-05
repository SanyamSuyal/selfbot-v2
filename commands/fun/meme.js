import fetch from 'node-fetch';

export default {
  name: 'meme',
  description: 'Fetch a random meme from various subreddits',
  category: 'fun',
  aliases: ['reddit', 'dankmeme'],
  cooldown: 3,
  usage: 'meme [subreddit]',

  async execute(client, message, args) {
    const subreddit = args[0] || 'memes';
    const validSubreddits = ['memes', 'dankmemes', 'wholesomememes', 'programmerhumor', 'funny', 'me_irl', 'PrequelMemes', 'animemes'];
    
    const statusMsg = await message.channel.send('🎯 **Fetching meme...** Please wait...');
    
    try {
      let targetSub = subreddit.toLowerCase();
      if (!validSubreddits.map(s => s.toLowerCase()).includes(targetSub)) {
        targetSub = validSubreddits[Math.floor(Math.random() * validSubreddits.length)];
      }

      const response = await fetch(`https://www.reddit.com/r/${targetSub}/hot.json?limit=50`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }

      const data = await response.json();
      const posts = data.data.children;
      
      if (!posts || posts.length === 0) {
        throw new Error('No posts found');
      }

      // Filter for image posts
      const imagePosts = posts.filter(post => {
        const url = post.data.url;
        return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) && 
               !post.data.over_18 && 
               !post.data.stickied;
      });

      if (imagePosts.length === 0) {
        throw new Error('No image posts found');
      }

      const randomPost = imagePosts[Math.floor(Math.random() * imagePosts.length)];
      const post = randomPost.data;

      const memeText = `🔥 **MEME FROM r/${post.subreddit.toUpperCase()}**

**${post.title}**

👍 **Upvotes:** ${post.ups.toLocaleString()}
� **Comments:** ${post.num_comments.toLocaleString()}
👤 **Author:** u/${post.author}
� **Subreddit:** r/${post.subreddit}
⏰ **Posted:** ${new Date(post.created_utc * 1000).toLocaleDateString()}

🖼️ **MEME IMAGE:**
${post.url}

✨ *Meme fetched for ${message.author.tag}*`;

      try {
        await statusMsg.edit(memeText);
      } catch {
        await message.channel.send(memeText);
      }

    } catch (error) {
      console.error('Meme fetch error:', error);
      
      const errorText = `❌ **Meme Fetch Failed**

**Error:** ${error.message}
**Subreddit:** r/${subreddit}

**Available subreddits:**
${validSubreddits.map(s => `\`${s}\``).join(', ')}

Try: \`!meme\` for random or \`!meme dankmemes\` for specific subreddit.`;

      try {
        await statusMsg.edit(errorText);
      } catch {
        await message.channel.send(errorText);
      }
    }
  }
};
