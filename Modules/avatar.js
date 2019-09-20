exports.commands = function (message, prefix) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if (commandName === prefix + 'avatar') {
        if (!parts[1]) {
            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: message.author.username + ' - Avatar',
                        icon_url: message.author.avatarURL
                    },
                    title: message.author.username + '\'s avatar',
                    description: message.author.avatarURL,
                    timestamp: new Date(),
                    image: {
                        url: message.author.avatarURL
                    },
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });

            if (message && message.deletable) {
                message.delete();
            }
            return;
        } else if (parts[1].indexOf('@') == -1) {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username + ' - Avatar',
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Unknown parameters',
                    description: 'Wrong parameters passed to command: `' + prefix + 'avatar`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            if (message && message.deletable) {
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
                    color: embedColor.success,
                    author: {
                        name: bot.user.username + ' - Avatar',
                        icon_url: bot.user.avatarURL
                    },
                    title: userMentionned.username + '\'s avatar',
                    description: userMentionned.avatarURL,
                    timestamp: new Date(),
                    image: {
                        url: userMentionned.avatarURL
                    },
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
        } else {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username + ' - Avatar',
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Unknown parameters',
                    description: 'Wrong parameters passed to command: `' + prefix + 'avatar`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            if (message && message.deletable) {
                message.delete();
            }
            return;
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
