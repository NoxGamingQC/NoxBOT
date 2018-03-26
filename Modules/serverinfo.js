const validationLevelName = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: '(╯°□°）╯︵ ┻━┻',
    4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
}
exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'serverinfo') {
        var botNumber = 0;
        message.guild.members.forEach(function(value) {
            if(value.user.bot === true) {
                botNumber += 1;
            }
        });
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL
                },
                title: '👑 Owner',
                description: message.guild.owner.user.tag,
                timestamp: message.guild.createdAt,
                fields: [{
                        name: '👦 Members',
                        value: (message.guild.memberCount - botNumber) + ' members'
                    },
                    {
                        name: '🤖 Bots',
                        value: botNumber + ' bots'
                    },
                    {
                        name: '🗄 ID',
                        value: message.guild.id
                    },
                    {
                        name: '🚔 Verification Level',
                        value: validationLevelName[message.guild.verificationLevel]
                    },
                    {
                        name: '🌎 Region',
                        value: message.guild.region
                    },
                    {
                        name: '😄 Emojis',
                        value: message.guild.emojis.array().length + ' emojis'
                    },
                    {
                        name: '🏠 Channels',
                        value: message.guild.channels.array().length + ' channels'
                    },
                    {
                        name: '🏷 Roles',
                        value: message.guild.roles.array().length + ' roles'
                    },
                ],
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: 'Server created at'
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
