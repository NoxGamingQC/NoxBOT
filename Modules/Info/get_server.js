const validationLevelName = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: '(╯°□°）╯︵ ┻━┻',
    4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
}

const explicitContentName = {
    0: 'Disabled',
    1: 'Members without roles',
    2: 'All members'
}

exports.commands = function (message, prefix) {
    var content = message.content;
        var parts = content.split(" ");
        var serverID = parts[1];
        var commandName = parts[0];
        
    if (commandName === prefix + 'getserver') {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bot ' + discordToken
            },
            url: 'https://discordapp.com/api/v6/guilds/' + serverID,
            method: 'GET',
            success: function(server) {
                message.channel.send({
                    embed: {
                        color: embedColor.success,
                        author: {
                            name: bot.user.username + ' - ' + server.name,
                            icon_url: bot.user.avatarURL
                        },
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/icons/' + server.id + '/' + server.icon + '.png'
                        },
                        title: '👑 Owner',
                        description: '<@' + server.owner_id + '>',
                        timestamp: new Date(),
                        fields: [
                        {
                            name: '🗄 ID',
                            value: server.id,
                            inline: true
                        },
                        {
                            name: '🗄 Name',
                            value: server.name,
                            inline: true
                        },
                        {
                            name: '🚔 Security',
                            value: ' - Verification Level: ' + validationLevelName[server.verification_level] + '\n - Content Filter: ' + explicitContentName[server.explicit_content_filter],
                            inline: true
                        },
                        {
                            name: '🌎 Region',
                            value: server.region,
                            inline: true
                        },
                        {
                            name: '😄 Emojis',
                            value: server.emojis.length + ' emojis',
                            inline: true
                        },
                        {
                            name: '🏷 Roles',
                            value: server.roles.length + ' roles',
                            inline: true
                        },
                    ],
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
            },
            error(error) {
                if(error.status == 403) {
                    message.channel.send({
                        embed: {
                            color: embedColor.error,
                            author: {
                                name: bot.user.username + ' - Avatar',
                                icon_url: bot.user.avatarURL
                            },
                            title: 'Error 403 - Server access forbidden',
                            description: 'Sorry I can\'t have access to this server. It might be cause I\'m not in said server.',
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                }
                reportError.reportError(error.status, error.statusText);
            }
        })
    }
}