exports.commands = function (prefix, message) {
    if (message.content === prefix + 'invite') {
        var server = message.guild;
        if (server) {
            message.channel.send({
                embed: {
                    color: env.discord.embedColor.success,
                    author: {
                        name: bot.user.username + ' - Invite link',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: server.iconURL
                    },
                    title: server.name,
                    description: 'You can invite your friend to join our server with the link below: ' + env.discord.discord_invite + '\n\n• ' + server.memberCount + ' members',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
