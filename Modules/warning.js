exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];


    if (commandName === prefix + 'warn') {
        if (parts.length < 2 || parts[1].match(/^[0-9]+$/) == null) {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Wrong format',
                    description: 'Make sure to use the proper syntax: `' + prefix + 'warn MessageID Reason`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
        } else {
            message.channel.fetchMessage(parts[1])
                .then(function (warnedMessage) {
                    var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
                    var userMentionned = warnedMessage.author;

                    if(parts.length >= 2) {
                        var reason = '';
                        reasonList = parts.slice(2);
                        reasonList.forEach(function(word) {
                            reason += ' ' + word;
                        });
                        reason = reason.trim();
                    } else {
                        var reason = '';
                    }

                    if (userMentionned) {
                        message.channel.send({
                            embed: {
                                color: embedColor.warning,
                                author: {
                                    name: bot.user.username + ' - Warning ' + userMentionned.username,
                                    icon_url: bot.user.avatarURL
                                },
                                timestamp: new Date(),
                                fields: [{
                                    name: 'Username',
                                    value: warnedMessage.author.tag,
                                    inline: true
                                },
                                {
                                    name: 'Moderator',
                                    value: message.author.tag,
                                    inline: true
                                },
                                {
                                    name: 'Room',
                                    value: '#' + warnedMessage.channel.name,
                                    inline: true
                                },
                                {
                                    name: 'Message',
                                    value: warnedMessage.content ? warnedMessage.content : 'Unknown (The content of the message is not available, the message might be embed)',
                                },
                                {
                                    name: 'Reason',
                                    value: reason,
                                }],
                                thumbnail: {
                                    url: userMentionned.avatarURL
                                },
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: message.author.tag
                                }
                            }
                        });
                    }


                    if (warnedMessage.deletable) {
                        warnedMessage.delete();
                    }
                })
                .catch(function (error) {
                    message.channel.send({
                        embed: {
                            color: embedColor.error,
                            author: {
                                name: bot.user.username,
                                icon_url: bot.user.avatarURL
                            },
                            title: 'Error - Message not found',
                            description: 'We\'re sorry but we are not able to find the user\'s message are you sure it is not already deleted? You might also had provided a wrong MessageID make sure to check it out.',
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                });
        }

        if (message && message.deletable) {
            message.delete();
        }
    }
}
