
exports.commands = function (message, prefix) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'rank' && parts[1]) {
        if(message.guild) {
            if (parts[1] === 'join') {
                var role = message.guild.roles.find(role => role.name === '+' + parts[2]);
                if (role) {
                    message.member.addRole(role.id);
                    message.channel.send({
                        embed: {
                            color: role.color,
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Roles',
                            description: 'You joined ' + parts[2] + ' successfully',
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                } else {
                    message.channel.send({
                        embed: {
                            color: '16711680',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Error - Roles',
                            description: 'This role does not exist',
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                }
            } else if (parts[1] === 'leave') {
                var role = message.guild.roles.find(role => role.name === '+' + parts[2]);
                if (role) {
                    message.member.removeRole(role.id);
                    message.channel.send({
                        embed: {
                            color: role.color,
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Roles',
                            description: 'You leaved ' + parts[2] + ' successfully',
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                } else {
                    message.channel.send({
                        embed: {
                            color: '16711680',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Error - Roles',
                            description: 'This role does not exist',
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                }
            } else if (parts[1] === 'list') {
                var rolesList = [];
                message.guild.roles.forEach(function (role) {
                    if (role.name.indexOf('+') !== -1) {
                        rolesList.push(role.name.replace('+', ''));
                    }
                });
                if (rolesList.length) {
                    roleString = rolesList.join('\n- ');
                    message.channel.send({
                        embed: {
                            color: '4961603',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'There\'s a list of joinable roles',
                            description: '- ' + roleString,
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                } else {
                    message.channel.send({
                        embed: {
                            color: '16711680',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Error - Roles',
                            description: 'You can\'t assign to yourself any roles on this server',
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                }
            }  else {
                message.channel.send({
                    embed: {
                        color: '16711680',
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        title: 'Error - Roles',
                        description: 'This command does not exist',
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: bot.user.username
                        }
                    }
                });
            }
        } else {
            message.channel.send({
                embed: {
                    color: '16711680',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Error - Roles',
                    description: 'You must be in a server to use this command',
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
