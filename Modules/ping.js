
exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    if (message.content === prefix + 'ping') {

        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' ping',
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: bot.user.avatarURL
                },
                title: 'Pong!',
                description: 'Average ping: **' + bot.ping.toFixed(0) + 'ms**',
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
