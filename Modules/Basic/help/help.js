exports.command = function(message) {
    if (message.content === process.env.PREFIX + 'help') {
        if (message.guild) {
            message.channel.send({
                embed: {
                    color: process.env.SUCCESS_COLOR,
                    author: {
                        name: bot.user.username + ' - Help',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: server.iconURL
                    },
                    title: 'Help requested!',
                    description: 'Sorry, but this module is not currently available. Thank you for your patience.',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.username
                    }
                }
            });
        }
    }
}
