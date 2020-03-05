exports.commands = function (message, prefix) {
    var parts = message.content.split(' ');
    var commandName = message.content.split(' ')[0];
    if (commandName === prefix + 'giveaway') {
        var giveawayTitle = '';
        if (message.member.hasPermission('MANAGE_ROLES')) {
            for (var i = 0; i < parts.length - 2; i++) {
                giveawayTitle += parts[i + 2] + ' ';
            }
            if (parts[1] == 'start') {
                var author = message.author;
                message.channel.send({
                    embed: {
                        color: embedColor.success,
                        author: {
                            name: bot.user.username + ' - 🎉 Giveaway 🎉',
                            icon_url: bot.user.avatarURL
                        },
                        title: giveawayTitle,
                        description: 'React with 🎉 to enter!',
                        thumbnail: {
                            url: message.guild.iconURL
                        },
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                }).then(function(message) {
                    message.react('🎉')
                        .then(() => message.react('✅'))
                        .then(() => message.react('🔄'))
                        .then(() => message.react('❌'))
                    bot.on('messageReactionAdd', (reaction, user) => {
                        if(author.id == user.id && reaction.message.id == message.id) {
                            var giveawayParticipants = [];

                            reaction.message.reactions.filter(function(reaction) {
                                if (reaction.emoji.name === '🎉') {
                                    reaction.users.forEach(function(user) {
                                        if(!user.bot) {
                                            giveawayParticipants.push(user.tag);
                                        }
                                    })
                                }
                            });
                            if (reaction.emoji.name === '✅') {
                                var giveawayWinner = giveawayParticipants[Math.floor(Math.random() * giveawayParticipants.length)];
                                message.channel.send({
                                    embed: {
                                        color: embedColor.success,
                                        author: {
                                            name: bot.user.username + ' - 🎉 Giveaway Winner!! 🎉',
                                            icon_url: bot.user.avatarURL
                                        },
                                        title: giveawayTitle,
                                        description: giveawayWinner ? '🎉 The Winner is ' + giveawayWinner + '! Congratulations !! 🎉' : 'Not enough participant to draw a winner',
                                        thumbnail: {
                                            url: message.guild.iconURL
                                        },
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: message.author.avatarURL,
                                            text: message.author.tag
                                        }
                                    }
                                })
                            }
                            if (reaction.emoji.name === '🔄') {
                                var giveawayWinner = giveawayParticipants[Math.floor(Math.random() * giveawayParticipants.length)];
                                message.channel.send({
                                    embed: {
                                        color: embedColor.success,
                                        author: {
                                            name: bot.user.username + ' - 🎉 Giveaway Rerolled Winner!! Congratulations !! 🎉',
                                            icon_url: bot.user.avatarURL
                                        },
                                        title: giveawayTitle,
                                        description: giveawayWinner ? '🎉 The rerolled Winner is ' + giveawayWinner + '! 🎉' : 'Not enough participant to redraw a winner',
                                        thumbnail: {
                                            url: message.guild.iconURL
                                        },
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: message.author.avatarURL,
                                            text: message.author.tag
                                        }
                                    }
                                })
                            }
                            if (reaction.emoji.name === '❌') {
                                message.channel.send({
                                    embed: {
                                        color: embedColor.error,
                                        author: {
                                            name: bot.user.username + ' - Giveaway Cancelled',
                                            icon_url: bot.user.avatarURL
                                        },
                                        title: giveawayTitle,
                                        description: 'The giveaway have been cancelled!',
                                        thumbnail: {
                                            url: message.guild.iconURL
                                        },
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: message.author.avatarURL,
                                            text: message.author.tag
                                        }
                                    }
                                })

                                if (message && message.deletable) {
                                    message.delete();
                                }
                            }
                        }
                    });
                });

            }
        } else {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username + ' - Giveaway',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: bot.user.avatarURL
                    },
                    title: 'Error - Permission denied',
                    description: 'You don\'t have the right to use that command',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
