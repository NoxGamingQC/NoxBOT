exports.command = function(message) {
    if (message.content === process.env.PREFIX + 'ping') {
        var server = message.guild;
        if (server) {
            message.channel.send({
                embed: {
                    color: process.env.SUCCESS_COLOR,
                    author: {
                        name: bot.user.username + ' - Ping',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: bot.user.avatarURL
                    },
                    title: 'Pong',
                    description: `🏓 Latency is ${Math.abs(Date.now() - message.createdTimestamp)}ms. API Latency is ${Math.round(bot.ping)}ms`,
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
