//~addreactionroles #channel-name messageID Emoji @role

exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];
    if(commandName == prefix + 'addreactionroles') {
        var messageID = parts[2];
        var channelID = message.guild.channels.find(channel => channel.id === parts[1].split('#')[1].split('>')[0]) ? message.guild.channels.find(channel => channel.id === parts[1].split('#')[1].split('>')[0]).id : null;
        if(channelID) {
            message.guild.channels.find(channel => channel.id === channelID).fetchMessage(messageID).then().catch(function(error) {
                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username + ' - Reactions Roles',
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error - Message not found',
                        description: 'The MessageID you specified doesn\'t exists. Be sure to use the command correctly `' + prefix + 'addreactionroles #channel-name MessageID @role Emoji`.',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
                return;
            });
            var roleID = message.guild.roles.find('id', parts[4].split('@')[1].split('>')[0].split('&')[1]) ? message.guild.roles.find(role => role.id === parts[4].split('@')[1].split('>')[0].split('&')[1]).id : null;
            if (roleID) {
                message.guild.fetchMember(message.author).then(function (member) {
                    if (member.hasPermission('MANAGE_ROLES')) {
                        dbConnection.query('INSERT INTO public.ReactionRoles(ServerID, RoleID, MessageID, Emoji, ChannelID) VALUES (\'' + message.guild.id + '\', \'' + roleID + '\', \'' + messageID + '\', \'' + parts[3] + '\', \'' + channelID +'\')', function(error, result) {
                            if (error) {
                                reportError(error);
                            }
                        });
                        message.channel.send({
                            embed: {
                                color: embedColor.success,
                                author: {
                                    name: bot.user.username + ' - Reactions Roles',
                                    icon_url: bot.user.avatarURL
                                },
                                title: 'Success - Reaction Roles',
                                description: 'The reaction roles has been added to the message successfully. NoxBot should react to your message shortly with the right emoji.',
                                timestamp: new Date(),
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: message.author.tag
                                }
                            }
                        });
                    } else {
                        message.channel.send({
                            embed: {
                                color: embedColor.error,
                                author: {
                                    name: bot.user.username + ' - Reactions Roles',
                                    icon_url: bot.user.avatarURL
                                },
                                title: 'Error - Missing permissions',
                                description: 'You don\'t have the proper permissions to use this command.',
                                timestamp: new Date(),
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: message.author.tag
                                }
                            }
                        });
                    }

                })
                .catch(function (error) {
                    message.channel.send({
                        embed: {
                            color: embedColor.error,
                            author: {
                                name: bot.user.username + ' - Reactions Roles',
                                icon_url: bot.user.avatarURL
                            },
                            title: 'Error - An unknown error happen',
                            description: 'Please try again later.',
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                    return;
                });
            } else {
                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username + ' - Reactions Roles',
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error - Role not found',
                        description: 'The role you specified doesn\'t exists. Be sure to use the command correctly `' + prefix + 'addreactionroles #channel-name MessageID @role Emoji`.',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
                return;
            }
        } else {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username + ' - Reactions Roles',
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Channel not found',
                    description: 'The channel you specified doesn\'t exists. Be sure to use the command correctly `' + prefix + 'addreactionroles #channel-name MessageID @role Emoji`.',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            return;
        }
    }
}
