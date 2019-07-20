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

exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    if (message.content === prefix + 'serverinfo') {
        var botNumber = 0;
        var categoriesChannels = [];
        var voiceChannels = [];
        var textChannels = [];
        message.guild.members.forEach(function(value) {
            if(value.user.bot === true) {
                botNumber += 1;
            }
        });
        message.guild.channels.forEach(function(value) {
            if (value.type == 'text') {
                textChannels.push(value.id);
            }
            if (value.type == 'voice') {
                voiceChannels.push(value.id);
            }
            if (value.type == 'category') {
                categoriesChannels.push(value.id);
            }
        });
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Server Information',
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: message.guild.iconURL
                },
                title: '👑 Owner',
                description: message.guild.owner.user.tag,
                timestamp: message.guild.createdAt,
                fields: [{
                        name: '👨‍👩‍👧‍👦 Members',
                        value: ' - ' + (message.guild.memberCount - botNumber) + ' humans\n - ' + botNumber + ' bots',
                        inline: true
                    },
                    {
                        name: '🗄 ID',
                        value: message.guild.id,
                        inline: true
                    },
                    {
                        name: '🚔 Security',
                        value: ' - Verification Level: ' + validationLevelName[message.guild.verificationLevel] + '\n - Content Filter: ' + explicitContentName[message.guild.explicitContentFilter],
                        inline: true
                    },
                    {
                        name: '🌎 Region',
                        value: message.guild.region,
                        inline: true
                    },
                    {
                        name: '🏠 Channels',
                        value: ' - ' + message.guild.channels.array().length + ' Channels\n - ' + textChannels.length + ' Text Channels\n - ' + voiceChannels.length + ' Voice Channels\n - ' + categoriesChannels.length + ' Categories',
                        inline: true
                    },
                    {
                        name: '😄 Emojis',
                        value: message.guild.emojis.array().length + ' emojis',
                        inline: true
                    },
                    {
                        name: '🏷 Roles',
                        value: message.guild.roles.array().length + ' roles',
                        inline: true
                    },
                ],
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag + ' • Server created at'
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
}
