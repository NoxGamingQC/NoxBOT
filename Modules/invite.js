exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    if (message.content === prefix + 'invite') {
        var server = message.guild;
        if (server) {
            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: bot.user.username + ' - Invite link',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: server.iconURL
                    },
                    title: server.name,
                    description: 'https://discord.gg/KPd4cC4\n\n• ' + server.memberCount + ' members',
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
