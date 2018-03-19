exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'invite') {
        var server = message.guild;
        if (server) {
            var channel = server.channels.find('id', '383695542452092929');
            if (channel) {
                channel.createInvite([options => {
                    maxAge: 86400
                }]).then(function (link) {
                    message.channel.send({
                        embed: {
                            color: '4961603',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Invite link',
                            description: `${link}`,
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: 'Invite link are valid only for 24h'
                            }
                        }
                    })
                });
            } else {
                message.channel.send({
                    embed: {
                        color: '16711680',
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        title: 'Error - Invite link',
                        description: `Cannot create invite link to the server`,
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: bot.user.username
                        }
                    }
                });
            }
        }
        if (message.deletable) {
            message.delete();
        }
    }
}
