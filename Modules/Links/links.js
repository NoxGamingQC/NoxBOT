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
                description: 'NoxGamingQC\'s Playstation Network username is: `NoxGamingQC`',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: 'NoxGamingQC\'s Steam profile page link is: http://steamcommunity.com/id/NoxGamingQC/',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: 'You can join NoxGamingQC\'s Twitch Channel at: https://www.twitch.tv/noxgamingqc',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: 'You can join NoxGamingQC\'s YouTube Channel at: https://www.youtube.com/channel/UCytKDUapog2tnJD4XenehiQ',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: 'You can join NoxGamingQC\'s Twitter profile at: http://www.twitter.com/noxgamingqc',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: 'You can join NoxGamingQC\'s MyAnimeList profile at: https://myanimelist.net/profile/NoxGamingQC',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: 'NoxGamingQC\'s Xbox Live username is: `NoxGamingQC`',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
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
                description: ' Follow NoxGamingQC on Instagram here: https://www.instagram.com/noxgamingqc/',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.name
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
}
