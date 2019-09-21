exports.commands = function (message, prefix, serverConfig = null) {
    if (message.content === prefix + 'commands') {
        dbConnection.query('SELECT * FROM public.modules_lists', function (error, result, fields) {
            var activeCommands = [];
            var moduleInMaintenance = [];
            var isActiveDefault = {};
            result.rows.forEach(function(value) {
                if(!isDev && value.Maintenance) {
                    moduleInMaintenance.push(value.Slug);
                }
                if(!isDev) {
                    isActiveDefault[value.Slug] = value.isActiveDefault;
                } else {
                    isActiveDefault[value.Slug] = true;
                }
            });

            if(serverConfig) {
                if(serverConfig.avatar) {
                    if (moduleInMaintenance.indexOf("avatar") > -1) {
                        activeCommands.push({
                            name: '😎 Avatars Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '😎 Avatars Commands',
                            value: '`' + prefix + 'avatar <@user>` **Get user\'s avatar.**'
                        });
                    }
                }

                if (serverConfig.giveaway) {
                    if (moduleInMaintenance.indexOf("giveaway") > -1) {
                        activeCommands.push({
                            name: '🎉 Giveaway Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🎉 Giveaway Commands',
                            value: '`' + prefix + 'giveaway start` **Create a giveaway.**'
                        });
                    }
                }

                if (serverConfig.help) {
                    if (moduleInMaintenance.indexOf("help") > -1) {
                        activeCommands.push({
                            name: '❓ Help Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '❓ Help Command',
                            value: '`' + prefix + 'help` **Get help from ' + bot.user.username + '.**'
                        });
                    }
                }

                if (serverConfig.info) {
                    if (moduleInMaintenance.indexOf("info") > -1) {
                        activeCommands.push({
                            name: '❓ Info Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '❓ Info Command',
                            value: '`' + prefix + 'info` **Get ' + bot.user.username + ' info.**'
                        });
                    }
                }

                if (serverConfig.lmgtfy) {
                    if (moduleInMaintenance.indexOf("lmgtfy") > -1) {
                        activeCommands.push({
                            name: '🌎 LMGTFY Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🌎 LMGTFY Command',
                            value: '`' + prefix + 'lmgtfy <search terms>` **Get a \'Let Me Google That For You\' link.**'
                        });
                    }
                }

                if (serverConfig.miscs) {
                    if (moduleInMaintenance.indexOf("miscs") > -1) {
                        activeCommands.push({
                            name: '⁉ Miscs Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '⁉ Miscs Commands',
                            value: 'Commands lists will be added later.'
                        });
                    }
                }

                if (serverConfig.music) {
                    if (moduleInMaintenance.indexOf("music") > -1) {
                        activeCommands.push({
                            name: '🎧 Music Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🎧 Music Commands',
                            value: '`' + prefix + 'init` **Connect ' + bot.user.username + ' to your current vocal room.**\n' +
                                    '`' + prefix + 'play <search terms or link>` **Play some music.**\n' +
                                    '`' + prefix + 'pause` **Pause the current song.**\n' +
                                    '`' + prefix + 'resume` **Resume the current song.**\n' +
                                    '`' + prefix + 'stop` **Stop the current song.**\n' +
                                    '`' + prefix + 'list` **Get the all the current song in the queue.**\n' +
                                    '`' + prefix + 'leave` **Leave the current voice room.**\n'
                        });
                    }
                }

                if (serverConfig.ping) {
                    if (moduleInMaintenance.indexOf("ping") > -1) {
                        activeCommands.push({
                            name: '📡 Ping Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '📡 Ping Command',
                            value: '`' + prefix + 'ping` **Get ' + bot.user.username + '\'s ping.**'
                        });
                    }
                }

                if (serverConfig.pokemon) {
                    if (moduleInMaintenance.indexOf("pokemon") > -1) {
                        activeCommands.push({
                            name: '🐿 Pokémon Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🐿 Pokémon Commands',
                            value: '`' + prefix + 'pokemon <pokémon name or Pokédex Entry>` **Get pokémon info.**\n' +
                                    '`' + prefix + 'pokemon <pokémon name or Pokédex Entry> shiny` **Get the shiny version info.**\n'
                        });
                    }
                }

                if (serverConfig.roles) {
                    if (moduleInMaintenance.indexOf("roles") > -1) {
                        activeCommands.push({
                            name: '🏷 Roles Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🏷 Roles Commands',
                            value: 'Commands lists will be added later.'
                        });
                    }
                }

                if (serverConfig.serverinfo) {
                    if (moduleInMaintenance.indexOf("server_info") > -1) {
                        activeCommands.push({
                            name: '👨‍👩‍👧‍👦 Server\'s information Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '👨‍👩‍👧‍👦 Server\'s information Command',
                            value: '`' + prefix + 'serverinfo` **Get the current server info.**'
                        });
                    }
                }

                if (serverConfig.userinfo) {
                    if (moduleInMaintenance.indexOf("user_info") > -1) {
                        activeCommands.push({
                            name: '👤 User\'s information Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '👤 User\'s information Command',
                            value: '`' + prefix + 'userinfo <@user>` **Get user info.**'
                        });
                    }
                }

                if (serverConfig.warframe) {
                    if (moduleInMaintenance.indexOf("warframe") > -1) {
                        activeCommands.push({
                            name: '🚀 Warframe Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🚀 Warframe Commands',
                            value: '`' + prefix + 'warframe info <Warframe name>` **Get info about a Warframe.**'
                        });
                    }
                }

                if (serverConfig.warning) {
                    if (moduleInMaintenance.indexOf("warning") > -1) {
                        activeCommands.push({
                            name: '⚔ Warning Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '⚔ Warning Command',
                            value: '`' + prefix + 'warn <@User> <MessageID> <Reason>` **Warn a user and delete his message.**'
                        });
                    }
                }

                if (serverConfig.management) {
                    if (moduleInMaintenance.indexOf("management") > -1) {
                        activeCommands.push({
                            name: '⚔ Warning Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '⚔ Management Commands',
                            value: '`' + prefix + 'addreactionroles #channel-name MessageID @role Emoji` **Add a reaction emoji to give roles to users**'
                        });
                    }
                }
            } else {
                if(isActiveDefault.avatar) {
                    if (moduleInMaintenance.indexOf("avatar") > -1) {
                        activeCommands.push({
                            name: '😎 Avatars Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '😎 Avatars Commands',
                            value: '`' + prefix + 'avatar <@user>` **Get user\'s avatar.**'
                        });
                    }
                }

                if (isActiveDefault.giveaway) {
                    if (moduleInMaintenance.indexOf("giveaway") > -1) {
                        activeCommands.push({
                            name: '🎉 Giveaway Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🎉 Giveaway Commands',
                            value: '`' + prefix + 'giveaway start` **Create a giveaway.**'
                        });
                    }
                }

                if (isActiveDefault.help) {
                    if (moduleInMaintenance.indexOf("help") > -1) {
                        activeCommands.push({
                            name: '❓ Help Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '❓ Help Command',
                            value: '`' + prefix + 'help` **Get help from ' + bot.user.username + '.**'
                        });
                    }
                }

                if (isActiveDefault.info) {
                    if (moduleInMaintenance.indexOf("info") > -1) {
                        activeCommands.push({
                            name: '❓ Info Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '❓ Info Command',
                            value: '`' + prefix + 'info` **Get ' + bot.user.username + ' info.**'
                        });
                    }
                }

                if (isActiveDefault.lmgtfy) {
                    if (moduleInMaintenance.indexOf("lmgtfy") > -1) {
                        activeCommands.push({
                            name: '🌎 LMGTFY Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🌎 LMGTFY Command',
                            value: '`' + prefix + 'lmgtfy <search terms>` **Get a \'Let Me Google That For You\' link.**'
                        });
                    }
                }

                if (isActiveDefault.miscs) {
                    if (moduleInMaintenance.indexOf("miscs") > -1) {
                        activeCommands.push({
                            name: '⁉ Miscs Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '⁉ Miscs Commands',
                            value: 'Commands lists will be added later.'
                        });
                    }
                }

                if (isActiveDefault.music) {
                    if (moduleInMaintenance.indexOf("music") > -1) {
                        activeCommands.push({
                            name: '🎧 Music Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🎧 Music Commands',
                            value: '`' + prefix + 'init` **Connect ' + bot.user.username + ' to your current vocal room.**\n' +
                                    '`' + prefix + 'play <search terms or link>` **Play some music.**\n' +
                                    '`' + prefix + 'pause` **Pause the current song.**\n' +
                                    '`' + prefix + 'resume` **Resume the current song.**\n' +
                                    '`' + prefix + 'stop` **Stop the current song.**\n' +
                                    '`' + prefix + 'list` **Get the all the current song in the queue.**\n' +
                                    '`' + prefix + 'leave` **Leave the current voice room.**\n'
                        });
                    }
                }

                if (isActiveDefault.ping) {
                    if (moduleInMaintenance.indexOf("ping") > -1) {
                        activeCommands.push({
                            name: '📡 Ping Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '📡 Ping Command',
                            value: '`' + prefix + 'ping` **Get ' + bot.user.username + '\'s ping.**'
                        });
                    }
                }

                if (isActiveDefault.pokemon) {
                    if (moduleInMaintenance.indexOf("pokemon") > -1) {
                        activeCommands.push({
                            name: '🐿 Pokémon Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🐿 Pokémon Commands',
                            value: '`' + prefix + 'pokemon <pokémon name or Pokédex Entry>` **Get pokémon info.**\n' +
                                    '`' + prefix + 'pokemon <pokémon name or Pokédex Entry> shiny` **Get the shiny version info.**\n'
                        });
                    }
                }

                if (isActiveDefault.roles) {
                    if (moduleInMaintenance.indexOf("roles") > -1) {
                        activeCommands.push({
                            name: '🏷 Roles Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🏷 Roles Commands',
                            value: 'Commands lists will be added later.'
                        });
                    }
                }

                if (isActiveDefault.serverinfo) {
                    if (moduleInMaintenance.indexOf("server_info") > -1) {
                        activeCommands.push({
                            name: '👨‍👩‍👧‍👦 Server\'s information Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '👨‍👩‍👧‍👦 Server\'s information Command',
                            value: '`' + prefix + 'serverinfo` **Get the current server info.**'
                        });
                    }
                }

                if (isActiveDefault.userinfo) {
                    if (moduleInMaintenance.indexOf("user_info") > -1) {
                        activeCommands.push({
                            name: '👤 User\'s information Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '👤 User\'s information Command',
                            value: '`' + prefix + 'userinfo <@user>` **Get user info.**'
                        });
                    }
                }

                if (isActiveDefault.warframe) {
                    if (moduleInMaintenance.indexOf("warframe") > -1) {
                        activeCommands.push({
                            name: '🚀 Warframe Commands',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '🚀 Warframe Commands',
                            value: '`' + prefix + 'warframe info <Warframe name>` **Get info about a Warframe.**'
                        });
                    }
                }

                if (isActiveDefault.warning) {
                    if (moduleInMaintenance.indexOf("warning") > -1) {
                        activeCommands.push({
                            name: '⚔ Warning Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '⚔ Warning Command',
                            value: '`' + prefix + 'warn <@User> <MessageID> <Reason>` **Warn a user and delete his message.**'
                        });
                    }
                }

                if (isActiveDefault.management) {
                    if (moduleInMaintenance.indexOf("management") > -1) {
                        activeCommands.push({
                            name: '⚔ Warning Command',
                            value: 'This module is currently under maintenance.'
                        });
                    } else {
                        activeCommands.push({
                            name: '⚔ Management Commands',
                            value: '`' + prefix + 'addreactionroles #channel-name MessageID @role Emoji` **Add a reaction emoji to give roles to users**'
                        });
                    }
                }
            }

            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: bot.user.username + ' commands',
                    description: message.author + ', there is a list of commands that you can use!',
                    fields: activeCommands,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: "© Copyright 2018 - 2019 ~ NoxGamingQC"
                    }
                }
            });
            if (message && message.deletable) {
                message.delete();
            }
        });
    }
}
