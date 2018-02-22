exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'color') {
        if (message.guild) {
            if (parts[1] === 'set') {
                var color = message.guild.roles.find('name', 'Color_' + parts[2]);
                if (color) {
                    message.guild.roles.forEach(function (role) {
                        if (role.name.indexOf('Color_') !== -1) {
                            message.member.removeRole(role.id);
                        }
                    });
                    message.member.addRole(color.id);
                    message.channel.send({
                        embed: {
                            color: color.color,
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'Colors',
                            description: 'Color ' + parts[2] + ' assigned successfuly',
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
                            title: 'Error - Color',
                            description: 'This color does not exist',
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                }
            } else if (parts[1] === 'reset') {
                message.guild.roles.forEach(function (role) {
                    if (role.name.indexOf('Color_') !== -1) {
                        message.member.removeRole(role.id);
                    }
                });
                message.channel.send({
                    embed: {
                        color: '4961603',
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL
                        },
                        title: 'Color',
                        description: 'Colors reset successfully',
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: bot.user.username
                        }
                    }
                });
            } else if (parts[1] === 'list') {
                var colorList = [];
                message.guild.roles.forEach(function (role) {
                    if (role.name.indexOf('Color_') !== -1) {
                        colorList.push(role.name.replace('Color_', ''));
                    }
                });
                if (colorList.length) {
                    colorsString = colorList.join('\n- ');
                    message.channel.send({
                        embed: {
                            color: '4961603',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: 'There\'s a list of assignable colors',
                            description: '- ' + colorsString,
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: bot.user.username
                            }
                        }
                    });
                } else {
                    message.react("❌");
                    message.reply(`You can't assign to yourself any color on this server`);
                }
            } else if (parts[1] === 'see') {
                var color = message.guild.roles.find('name', 'Color_' + parts[2]);
                if (color) {
                    var hex = ('000000' + color.color.toString(16)).slice(-6);
                    message.channel.send({
                        embed: {
                            color: color.color,
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            title: color.name.replace('Color_', ''),
                            description: '#' + hex,
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
                            title: 'Error - Color',
                            description: 'This color does not exist',
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
                        title: 'Error - Color',
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
                    title: 'Error - Color',
                    description: 'You must be in a server to use this command',
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        }
        if (message.deletable) {
            message.delete();
        }
    }
}
