exports.command = function(message, prefix) {
    if (message.content === prefix + 'ping') {
        message.channel.send({
            embed: {
                color: process.env.SUCCESS_COLOR,
                author: {
                    name: discordBot.user.username + ' - Ping',
                    icon_url: discordBot.user.avatarURL
                },
                thumbnail: {
                    url: discordBot.user.avatarURL
                },
                title: 'Pong',
                description: `🏓 Latency is ${Math.abs(Date.now() - message.createdTimestamp)}ms. API Latency is ${Math.round(discordBot.ping)}ms`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.username
                }
            }
        });
    }
};
