exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if (commandName === prefix + 'userinfo') {
        if (!parts[1] || parts[1].indexOf('@') == -1) {
            message.channel.send({
                embed: {
                    color: '16711680',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Error - User information',
                    description: 'Wrong parameters passed to command: `' + prefix + 'userinfo`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
            if (message.deletable) {
                message.delete();
            }
            return;
        }
        var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
        var userMentionned = null;
        bot.users.forEach(function (user) {
            if (user.id === userID) {
                userMentionned = user;
            };
        });
        if (userMentionned) {
            message.channel.send({
                embed: {
                    color: '4961603',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Username',
                    description: userMentionned.username,
                    timestamp: userMentionned.createdAt,
                    fields: [{
                        name: 'Discriminator',
                        value: userMentionned.discriminator
                    },
                    {
                        name: 'ID',
                        value: userMentionned.id
                    },
                    {
                        name: 'Game',
                        value: userMentionned.presence.game ? userMentionned.presence.game.name : 'None'
                    },
                    {
                        name: 'Status',
                        value: userMentionned.presence.status
                    },
                    {
                        name: 'Streaming',
                        value: userMentionned.presence.game ? userMentionned.presence.game.streaming : 'False'
                    }],
                    image: {
                        url: userMentionned.avatarURL
                    },
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: 'User created at'
                    }
                }
            });
        } else {
            message.channel.send({
                embed: {
                    color: '16711680',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Error - User information',
                    description: 'Wrong parameters passed to command: `' + prefix + 'userinfo`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
            if (message.deletable) {
                message.delete();
            }
            return;
        }
        if (message.deletable) {
            message.delete();
        }
    }
}
