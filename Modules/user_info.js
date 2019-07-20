exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if (commandName === prefix + 'userinfo') {
        if (!parts[1] || parts[1].indexOf('@') == -1) {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Unknown parameters',
                    description: 'Wrong parameters passed to command: `' + prefix + 'userinfo`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            if (message && message.deletable) {
                message.delete();
            }
            return;
        }
        var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
        var userMentionned = null;
        var guildMember = null;
        var roleLists = [];
        bot.users.forEach(function (user) {
            if (user.id === userID) {
                userMentionned = user;
            };
        });
        message.guild.members.forEach(function (member) {
            if(member.id === userID) {
                guildMember = member;
            }
        });

        guildMember.roles.forEach(function(role) {
            roleLists.push('<@&' + role.id + '>');
        })
        if (userMentionned) {
            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: bot.user.username + ' - User Information',
                        icon_url: bot.user.avatarURL
                    },
                    timestamp: new Date(),
                    fields: [{
                        name: 'Username',
                        value: userMentionned.username,
                        inline: true
                    },
                    {
                        name: 'Discriminator',
                        value: userMentionned.discriminator,
                        inline: true
                    },
                    {
                        name: 'ID',
                        value: userMentionned.id,
                        inline: true
                    },
                    {
                        name: 'Bot',
                        value: userMentionned.bot,
                        inline: true
                    },
                    {
                        name: 'Registered',
                        value: new Date(userMentionned.createdAt).toDateString(),
                        inline: true
                    },
                    {
                        name: 'Joined',
                        value: new Date(guildMember.joinedAt).toDateString(),
                        inline: true
                    },
                    {
                        name: 'Game',
                        value: userMentionned.presence.game ? userMentionned.presence.game.name : 'None',
                        inline: true
                    },
                    {
                        name: 'Status',
                        value: userMentionned.presence.status,
                        inline: true
                    },
                    {
                        name: 'Streaming',
                        value: userMentionned.presence.game ? userMentionned.presence.game.streaming : 'False',
                        inline: true
                    },
                    {
                        name: 'Roles [' + roleLists.length + ']',
                        value: roleLists.join(' '),
                        inline: true
                    },
                    {
                        name: 'Key Permissions [' + guildMember.permissions.toArray().length + ']',
                        value: guildMember.permissions.toArray().join(', '),
                        inline: true
                    }],
                    thumbnail: {
                        url: userMentionned.avatarURL
                    },
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
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Unknown parameters',
                    description: 'Wrong parameters passed to command: `' + prefix + 'userinfo`',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            if (message && message.deletable) {
                message.delete();
            }
            return;
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
