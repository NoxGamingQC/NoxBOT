exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'kiwis') {
        message.channel.send({
            embed: {
                color: '11982139',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Kiwis!!!',
                description: '🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝',
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
    }
    if (message.content === prefix + 'pecyclage') {
        message.channel.send({
            embed: {
                color: '20735',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'PECYCLAGE!!',
                description: 'Le pecyclage est supérieur au recyclage',
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
    }
}
