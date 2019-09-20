exports.commands = function (message, prefix) {
    var parts = message.content.split(" ");
    if (message.content === prefix + 'chatstats') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Chat statistics',
                description: 'You can access chat statistics here: https://stats.streamelements.com/c/noxracing PogChamp',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'twitchcommands') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Twitch Chat Commands',
                description: 'You can find a list of all Chat Commands here https://streamelements.com/noxracing/commands',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'equipement') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Equipement',
                description: '<@169592161132740608> equipement can be found here: https://noxracing.herokuapp.com/stream',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'extralife') {
        message.channel.send({
            embed: {
                color: '2540267',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Extra Life',
                description: message.author.username + ', you can help me to help children of my local Children\'s Miracle Network hospitals at https://www.extra-life.org/participant/noxracinggaming',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'store') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'NoxRacing\'s stream store',
                description: 'You can access the store here https://StreamElements.com/noxracing/store',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'leaderboard' || message.content === prefix + 'points') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'NoxRacing\'s Stream Leaderboard',
                description: 'Check out the Stream Leaderboard here https://streamelements.com/noxracing/leaderboard',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (parts[0] === prefix + 'so') {
        var isMod = false;
        message.member.roles.forEach(function (role) {
            if (role.id === '372704012669288450' || role.id === '282903827089195009') {
                isMod = true;
            }
        });
        if (isMod) {
            if (parts.slice(1).join(' ').trim()) {
                message.channel.send({
                    embed: {
                        color: '6570405',
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        title: 'Shoutout',
                        description: 'Hey racers, ' + parts[1] + ' just stopped by! Go throw them a follow at https://twitch.tv/' + parts[1].toLowerCase() + ' . They\'re awesome. 😉',
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: bot.user.username,
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
                        title: 'Error - Shoutout',
                        description: 'You must precise the name of the streamer to shoutout: `' + prefix + 'so <streamer name>`',
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: bot.user.username
                        }
                    }
                });
            }
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
