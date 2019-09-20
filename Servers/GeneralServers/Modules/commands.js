exports.commands = function (message, prefix) {
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
                    value: prefix + 'commands: Get ' + bot.user.username + ' commands\n' + prefix + 'invite: Get an invite link to ' + bot.user.username + ' official server\n' + prefix + 'serverinfo: Get current server informations'
                },
                {
                    name: "​🔐 Roles commands",
                    value: prefix + 'rank list: List of all joinable roles\n' + prefix + 'rank join <role>: Make you join a role\n' + prefix + 'rank leave <role>: Make you leave a role'
                },
                {
                    name: "​🎨 Colors commands",
                    value: prefix + 'color set <color>: Give you a color\n' + prefix + 'color reset: Remove your color\n' + prefix + 'color see <color>: Give you a demo of the color\n' + prefix + 'color list: Give you a list of color'
                }
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
        if (message && message.deletable) {
            message.delete();
        }
    }
}
