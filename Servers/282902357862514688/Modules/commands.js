exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'commands') {
        message.author.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: bot.user.username + ' commands',
                description: message.author + ', there is the list of commands you can use!',
                fields: [{
                    name: "​🌎 General commands",
                    value: prefix + 'commands: Get ' + bot.user.username + ' commands\n' + prefix + 'avatar <mentionned user>: Show your avatar\n' + prefix + 'invite: Create a 24h link to the server\n' + prefix + 'lmgtfy <search terms>: Send you a LMGTFY link\n' + prefix + 'ping: Show the ' + bot.user.username + ' ping\n' + prefix + 'userinfo <@username>: Get information about the desired user\n' + prefix + 'serverinfo: Get current server informations'
                },
                {
                    name: "🔗 Links commands",
                    value: prefix+'psn: Get NoxRacing\'s PSN Username\n'+prefix+'steam: Get NoxRacing\'s Steam profile link\n'+prefix+'steamgroup: Get NoxRacing\'s official Steam group link\n'+prefix+'twitch: Get NoxRacing\'s Twitch channel link\n'+prefix+'xbl: Get NoxRacing\'s Xbox Live Username\n'+prefix+'youtube: Get NoxRacing\'s YouTube channel link\n'+prefix+'twitter: Get NoxRacing\'s Twitter profile link\n'+prefix+'curse: Get NoxRacing\'s Curse | Twitch server link\n'+prefix+'animelist: Get NoxRacing\'s MyAnimeList profile link\n'+prefix+'instagram: Get NoxRacing\'s Instagram profile link'
                },
                {
                    name: "​🔐 Roles commands",
                    value: prefix+'rank list: List of all joinable roles\n'+prefix+'rank join <role>: Make you join a role\n'+prefix+'rank leave <role>: Make you leave a role'
                },
                {
                    name: "🎨 Colors commands",
                    value: prefix+'color set <color>: Give you a color\n'+prefix+'color reset: Remove your color\n'+prefix+'color see <color>: Give you a demo of the color\n'+prefix+'color list: Give you a list of color'
                },
                {
                    name: "🎥 Twitch commands",
                    value: prefix + 'chatstats: Give you chat statistics\n' + prefix + 'twitchcommands: Give you the Twitch commands list\n' + prefix + 'equipement: Know what\'s the equipement NoxRacing\'s using\n' + prefix + 'extralife: Support NoxRacing local hospital\n' + prefix + 'store: Get NoxRacing\'s store link\n' + prefix + 'leaderboard: Get NoxRacing\'s leaderboard link\n' + prefix + 'points: Get NoxRacing\'s leaderboard link\n'
                },
                {
                    name: "⚔️ Moderations commands",
                    value: prefix + 'timeout <user> <reason>: Mute the user for an undefined amount of time, the moderator must precise the reasons of the timeout\n' + prefix +'so <username>: Shoutout the given Twitch Streamer'
                }],
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
