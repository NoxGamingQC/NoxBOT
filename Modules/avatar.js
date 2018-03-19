exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if (commandName === prefix + 'avatar') {
        if (!parts[1] || parts[1].indexOf('@') == -1) {
            message.channel.send({
                embed: {
                    color: '16711680',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Error - Avatar',
                    description: 'Wrong parameters passed to command: `' + prefix + 'avatar`',
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
                    title: userMentionned.username + '\'s avatar',
                    description: userMentionned.avatarURL,
                    timestamp: new Date(),
                    image: {
                        url: userMentionned.avatarURL
                    },
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
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
                    title: 'Error - Avatar',
                    description: 'Wrong parameters passed to command: `' + prefix + 'avatar`',
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
