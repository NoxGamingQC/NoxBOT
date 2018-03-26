exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'invite') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Invite link',
                description: 'Join Nox\'s Racing Circle not at: https://discord.gg/wTsy4UP',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        })
        if (message.deletable) {
            message.delete();
        }
    }
}
