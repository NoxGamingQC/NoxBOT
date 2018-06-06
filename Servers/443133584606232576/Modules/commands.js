exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'commands') {
        message.author.send({
            embed: {
                color: '4961603',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: bot.user.username + ' commands',
                description: message.author + ', there is the list of commands you can use!',
                fields: [{
                    name: "🌎 General commands",
                    value: prefix + 'commands: Get ' + bot.user.username + ' commands\n' + prefix + 'serverinfo: Get current server informations'
                },
                {
                    name: "🔫 Black Squad commands",
                    value: 'Available soon'
                },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: bot.user.username + ' commands',
                description: message.author + ', a list of commands have been sent to your private message, go check them out! :wink:',
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
