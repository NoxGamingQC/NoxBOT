exports.command = function(message, prefix) {
    if (message.content === prefix + 'help') {
        if (message.guild) {
            message.channel.send({
                embed: {
                    color: process.env.SUCCESS_COLOR,
                    author: {
                        name: discordBot.user.username + ' - Help',
                        icon_url: discordBot.user.avatarURL
                    },
                    thumbnail: {
                        url: message.guild.iconURL
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
