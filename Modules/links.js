exports.commands = function (message, prefix) {
    if (message.content === prefix + 'psn') {
        message.channel.send({
            embed: {
                color: '12423',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'steam') {
        message.channel.send({
            embed: {
                color: '2174266',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'steamgroup') {
        message.channel.send({
            embed: {
                color: '2174266',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'twitch') {
        message.channel.send({
            embed: {
                color: '6570405',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'youtube') {
        message.channel.send({
            embed: {
                color: '16582421',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'curse') {
        message.channel.send({
            embed: {
                color: '6570405',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'twitter') {
        message.channel.send({
            embed: {
                color: '2466542',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'animelist') {
        message.channel.send({
            embed: {
                color: '3232926',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'xbl') {
        message.channel.send({
            embed: {
                color: '1080336',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
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
        if (message && message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'instagram') {
        message.channel.send({
            embed: {
                color: '12331661',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Instagram',
                description: ' Follow <@169592161132740608> on Instagram here: https://www.instagram.com/noxracinggaming/',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
}
