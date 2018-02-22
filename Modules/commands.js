exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'commands') {
        if(message.guild) {
            if(message.guild.id == '282902357862514688') { //nox
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
                            name: "​🌎 General commands",
                            value: prefix+'commands: Get '+bot.user.username+' commands\n'+prefix+'avatar <mentionned user>: Show your avatar\n'+prefix+'invite: Create a 24h link to the server\n'+prefix+'lmgtfy <search terms>: Send you a LMGTFY link\n'+prefix+'ping: Show the '+bot.user.username+' ping'
                        },
                        {
                            name: "🔗 Links commands",
                            value: prefix+'psn: Get NoxRacing\'s PSN Username\n'+prefix+'steam: Get NoxRacing\'s Steam profile link\n'+prefix+'twitch: Get NoxRacing\'s Twitch channel link\n'+prefix+'xbl: Get NoxRacing\'s Xbox Live Username'
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
                            name: "⚔️ Moderations commands",
                            value: prefix + 'timeout <user> <reason>: Mute the user for an undefined amount of time, the moderator must precise the reasons of the timeout'
                        }],
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: "© Copyright 2018 - NoxRacing"
                        }
                    }
                });
            } else if (message.guild.id == '343049869847429120') { //tiwill
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
                            value: prefix + 'commands: Get ' + bot.user.username + ' commands'
                        },
                        {
                            name: "​🔐 Roles commands",
                            value: prefix + 'rank list: List of all joinable roles\n' + prefix + 'rank join <role>: Make you join a role\n' + prefix + 'rank leave <role>: Make you leave a role'
                        },
                        {
                            name: "🎨 Colors commands",
                            value: prefix + 'color set <color>: Give you a color\n' + prefix + 'color reset: Remove your color\n' + prefix + 'color see <color>: Give you a demo of the color\n' + prefix + 'color list: Give you a list of color'
                        },
                        {
                            name: "⚔️ Moderations commands",
                            value: prefix + 'timeout <user> <reason>: Mute the user for an undefined amount of time, the moderator must precise the reasons of the timeout'
                        }],
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: "© Copyright 2018 - NoxRacing"
                        }
                    }
                });
            } else {
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
                            value: prefix + 'commands: Get ' + bot.user.username + ' commands'
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
            }
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
        } else {
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
                        value: prefix + 'commands: Get ' + bot.user.username + ' commands'
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
        }
        if (message.deletable) {
            message.delete();
        }
    }
}
