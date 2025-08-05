export default {
  name: 'friends',
  description: 'List and manage your Discord friends',
  category: 'social',
  aliases: ['friendlist', 'fl'],
  cooldown: 5,
  usage: 'friends [online|all]',

  async execute(client, message, args) {
    const filter = args[0]?.toLowerCase();
    
    try {
      const friends = client.user.friends;
      
      if (!friends || friends.size === 0) {
        return message.channel.send('❌ No friends found or unable to access friends list.');
      }

      let friendsList = Array.from(friends.values());
      
      if (filter === 'online') {
        friendsList = friendsList.filter(friend => friend.presence?.status !== 'offline' && friend.presence?.status !== null);
      }

      if (friendsList.length === 0) {
        return message.channel.send(filter === 'online' ? '❌ No online friends found.' : '❌ No friends found.');
      }

      // Sort by status and username
      friendsList.sort((a, b) => {
        const statusOrder = { 'online': 1, 'idle': 2, 'dnd': 3, 'offline': 4 };
        const aStatus = a.presence?.status || 'offline';
        const bStatus = b.presence?.status || 'offline';
        
        if (statusOrder[aStatus] !== statusOrder[bStatus]) {
          return statusOrder[aStatus] - statusOrder[bStatus];
        }
        return a.username.localeCompare(b.username);
      });

      const statusEmojis = {
        'online': '🟢',
        'idle': '🟡', 
        'dnd': '🔴',
        'offline': '⚫'
      };

      // Create pages if too many friends
      const friendsPerPage = 10;
      const pages = Math.ceil(friendsList.length / friendsPerPage);
      const currentPage = 1;
      
      const startIndex = (currentPage - 1) * friendsPerPage;
      const endIndex = startIndex + friendsPerPage;
      const currentFriends = friendsList.slice(startIndex, endIndex);

      const friendsText = currentFriends.map(friend => {
        const status = friend.presence?.status || 'offline';
        const emoji = statusEmojis[status] || '⚫';
        const activity = friend.presence?.activities?.[0]?.name || 'None';
        return `${emoji} **${friend.username}#${friend.discriminator}** - ${activity}`;
      }).join('\n');

      const embed = {
        title: `👥 ${filter === 'online' ? 'Online ' : ''}Friends List`,
        description: friendsText,
        fields: [
          {
            name: '📊 Statistics',
            value: `Total: ${friends.size}\nShowing: ${currentFriends.length}\nOnline: ${friendsList.filter(f => f.presence?.status === 'online').length}`,
            inline: true
          }
        ],
        color: 0x00ff00,
        timestamp: new Date(),
        footer: {
          text: pages > 1 ? `Page ${currentPage}/${pages} | Use !friends online for online only` : 'Use !friends online for online friends only',
          icon_url: message.author.displayAvatarURL()
        }
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send('❌ Unable to access friends list. This might be a limitation of selfbots.');
    }
  }
};
