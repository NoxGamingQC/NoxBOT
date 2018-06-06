exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    var member = message.member;
    if (message.content === prefix + 'lang add fr') {
       if (member.roles.find('id', '382941366419718153') == null) {
            member.addRole('382941366419718153');
            var role = message.guild.roles.find('id', '382941366419718153');
            message.channel.send({
                embed: {
                    color: role.color,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Language',
                    description: 'French language has been assigned to your speaking language',
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: '© Copyright 2018 - NoxRacing'
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
                   title: 'Error - Language assignation',
                   description: `You already have the language on your profile`,
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
    if (message.content === prefix + 'lang add en') {
        member.addRole('382941397537521666');
        var role = message.guild.roles.find('id', '382941397537521666');
        message.channel.send({
            embed: {
                color: role.color,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Language',
                description: 'English language has been assigned to your speaking language',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }

    if (message.content === prefix + 'lang remove fr') {
        member.removeRole('382941366419718153');
        var role = message.guild.roles.find('id', '382941366419718153');
        message.channel.send({
            embed: {
                color: role.color,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Language',
                description: 'French language has been removed to your speaking language',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
    if (message.content === prefix + 'lang remove en') {
        member.removeRole('382941397537521666');
        var role = message.guild.roles.find('id', '382941397537521666');
        message.channel.send({
            embed: {
                color: role.color,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Language',
                description: 'English language has been removed to your speaking language',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: '© Copyright 2018 - NoxRacing'
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
