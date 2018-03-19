exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'ping') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: bot.user.username + ' ping',
                description: `Average ping: ${bot.ping}ms`,
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
