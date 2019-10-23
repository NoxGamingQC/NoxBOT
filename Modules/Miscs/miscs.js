exports.commands = function (message, prefix) {
    if (message.content === prefix + 'kiwis') {
        message.channel.send({
            embed: {
                color: '11982139',
                author: {
                    name: bot.user.username + ' - Kiwis',
                    icon_url: bot.user.avatarURL
                },
                title: '',
                description: '🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝',
                timestamp: new Date(),
                thumbnail: {
                    url: 'https://images.emojiterra.com/google/android-oreo/512px/1f95d.png'
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
    }
    if (message.content === prefix + 'lenny') {
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Lenny',
                    icon_url: bot.user.avatarURL
                },
                title: '',
                description: '( ͡° ͜ʖ ͡°)',
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
    }
    if (message.content === prefix + 'nox') {
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - NoxGamingQC',
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: 'https://images-ext-1.discordapp.net/external/gyNfORp6lowlycpFmh2NKZ_ZZ7cjldDFOefAs8tX8xI/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/169592161132740608/14596f36b4a467abca755424768023fd.png'
                },
                title: '',
                description: '**"**I’m a guy! I’m a guys! Oh fuck that shit I’m a Nox**"** – _NoxGamingQC, 2017-12-17_',
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
    }
}
