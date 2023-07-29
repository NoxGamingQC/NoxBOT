exports.command = function(message, prefix) {
    if (message.content === prefix + 'server') {
        if(message.guild) {
            message.channel.send({
                embed: {
                    color: process.env.SUCCESS_COLOR,
                    author: {
                        name: bot.user.username + ' - Server information',
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: message.guild.iconURL
                    },
                    title: message.guild.name,
                    description: 'This server is own by ' +  message.guild.owner,
                    fields: [
                        {
                            name: 'ID',
                            value: message.guild.id,
                        },
                        {
                            name: 'Creation date',
                            value: message.guild.createdAt,
                            inline: true,
                        },
                        {
                            name: 'Members',
                            value: message.guild.memberCount,
                            inline: true,
                        },
                        {
                            name: 'Channels',
                            value: message.guild.channels.array().length,
                            inline: true,
                        },
                        {
                            name: 'Roles',
                            value: message.guild.roles.array().length,
                            inline: true,
                        },
                        {
                            name: 'MFA level',
                            value: message.guild.mfaLevel,
                            inline: true,
                        },
                        {
                            name: 'Verification level',
                            value: message.guild.verificationLevel,
                            inline: true,
                        },
                        {
                            name: 'Verified',
                            value: message.guild.verified,
                            inline: true,
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.username
                    }
                }
            });
        }
    }
};