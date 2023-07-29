exports.command = function(message, prefix) {
    if (message.content === prefix + 'invite') {
        if (message.guild) {
            message.channel.send({
                embed: {
                    color: process.env.SUCCESS_COLOR,
                    author: {
                        name: bot.user.username + ' - Invite link',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: server.iconURL
                    },
                    title: server.name,
                    description: 'You can invite your friend to join our server with the link below: ' + process.env.DISCORD_INVITE + '\n\n• ' + server.memberCount + ' members',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.username
                    }
                }
            });
        }
    }
}
