exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.guild && message.guild.id == '282902357862514688') {
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
}
