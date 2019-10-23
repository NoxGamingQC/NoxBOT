exports.commands = function (message, prefix) {
    var statusName = '';
    var parts = message.content.split(' ');
    var commandName = message.content.split(' ')[0];
    if (commandName === prefix + 'setStatus') {
        if (message.author.username == message.guild.members.find(member => member.id === '169592161132740608').displayName) {
            if (parts[1] == 'online' || parts[1] == 'idle' || parts[1] == 'dnd' || parts[1] == 'invisible') {
                bot.user.setStatus(parts[1]);

                if (parts[1] == 'online') {
                    statusName = 'online';
                } else if (parts[1] == 'idle') {
                    statusName = 'idle';
                } else if (parts[1] == 'dnd') {
                    statusName = 'do not disturb';
                } else if (parts[1] == 'invisible') {
                    statusName = 'invisible';
                }
                message.channel.send({
                    embed: {
                        color: embedColor.success,
                        author: {
                            name: bot.user.username + ' - Status change',
                            icon_url: bot.user.avatarURL
                        },
                        thumbnail: {
                            url: bot.user.avatarURL
                        },
                        title: '',
                        description: 'Bot status now set on **' + statusName + '**.',
                        timestamp: new Date(),
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
                            name: bot.user.username + ' - Status change',
                            icon_url: bot.user.avatarURL
                        },
                        thumbnail: {
                            url: bot.user.avatarURL
                        },
                        title: 'Error - Status doesn\'t exist',
                        description: 'This status doesn\'t exist, please choose between the following: online, idle, dnd or invisible.',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
            }
        } else {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username + ' - Status change',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: bot.user.avatarURL
                    },
                    title: 'Error - Permission denied',
                    description: 'You don\'t have the right to use that command',
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

    if (commandName === prefix + 'setActivity') {
        if (message.author.username == message.guild.members.find(member => member.id === '169592161132740608').displayName) {
            var activity = message.content.split(commandName + ' ')[1]
            if(activity) {
                activity.split(' https://');
            }
            if (activity && activity.split(' https://')[0] && activity.split(' https://')[1]) {
                console.log(activity);
                bot.user.setActivity(activity.split(' https://')[0], { 'url': 'https://' + activity.split(' https://')[1], 'type': 'STREAMING' });
            } else if (!activity) {
                activity = 'rebrand.ly/noxracing | ' + prefix + 'commands'
                bot.user.setActivity(activity);
            } else {
                bot.user.setActivity(activity);
            }
                message.channel.send({
                    embed: {
                        color: embedColor.success,
                        author: {
                            name: bot.user.username + ' - Activity change',
                            icon_url: bot.user.avatarURL
                        },
                        thumbnail: {
                            url: bot.user.avatarURL
                        },
                        title: '',
                        description: 'Bot activity set to **' + activity + '**.',
                        timestamp: new Date(),
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
                        name: bot.user.username + ' - Activity change',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: bot.user.avatarURL
                    },
                    title: 'Error - Permission denied',
                    description: 'You don\'t have the right to use that command',
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
