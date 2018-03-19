exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'psn') {
        message.channel.send({
            embed: {
                color: '12423',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'PSN Username',
                description: 'NoxRacing\'s Playstation Network username is: `HowlNox22607`',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'steam') {
        message.channel.send({
            embed: {
                color: '2174266',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Steam profile',
                description: 'NoxRacing\'s Steam profile page link is: http://steamcommunity.com/id/Noxracing/',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'steamgroup') {
        message.channel.send({
            embed: {
                color: '2174266',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Steam group',
                description: 'NoxRacing\'s Steam group link is: http://steamcommunity.com/groups/nox_racing_circle',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'twitch') {
        message.channel.send({
            embed: {
                color: '6570405',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Twitch channel',
                description: 'You can join NoxRacing\'s Twitch Channel at: https://www.twitch.tv/noxracing',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'youtube') {
        message.channel.send({
            embed: {
                color: '16582421',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'YouTube channel',
                description: 'You can join NoxRacing\'s YouTube Channel at: https://www.youtube.com/channel/UCytKDUapog2tnJD4XenehiQ',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'curse') {
        message.channel.send({
            embed: {
                color: '6570405',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Curse|Twitch server',
                description: 'You can join NoxRacing\'s Twitch server at: https://app.twitch.tv/servers/Eo9w5X',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'twitter') {
        message.channel.send({
            embed: {
                color: '2466542',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Twitter profile',
                description: 'You can join NoxRacing\'s Twitter profile at: http://www.twitter.com/noxracing',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'animelist') {
        message.channel.send({
            embed: {
                color: '3232926',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'MyAnimeList profile',
                description: 'You can join NoxRacing\'s MyAnimeList profile at: https://myanimelist.net/profile/NoxRacing',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'xbl') {
        message.channel.send({
            embed: {
                color: '1080336',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Xbox Live Username',
                description: 'NoxRacing\'s Xbox Live username is: `HowlNox22607`',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
