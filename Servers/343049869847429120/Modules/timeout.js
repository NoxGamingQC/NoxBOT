exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'timeout') {
        var isMod = false;
        message.member.roles.forEach(function (role) {
            if ((role.id === '343070332850012170') || (role.id === '343069878972055552') || (role.id === '343069451056316417')) {
                isMod = true;
            }
        });
        if (isMod) {
            if (!parts[1] || parts[1].indexOf('@') == -1) {
                message.react("❌");
                message.reply('L\'utilisateur n\'as pas été trouvé');
                return;
            }
            var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
            if (parts.slice(2).join(' ').trim()) {
                message.guild.members.forEach(function (member) {
                    if (member.id === userID) {
                        member.addRole('343075905662353410');
                        message.channel.send({
                            embed: {
                                color: '14964897',
                                author: {
                                    name: message.author.username,
                                    icon_url: message.author.avatarURL
                                },
                                title: '🐷GROS COCHON!!',
                                description: 'Le membre ' + parts[1] + ' à été mute sur ' + message.guild.name,
                                fields: [{
                                    name: "Raison",
                                    value: parts.slice(2).join(' ')
                                }],
                                timestamp: new Date(),
                                footer: {
                                    icon_url: bot.user.avatarURL,
                                    text: bot.user.username,
                                }
                            }
                        });
                    }
                });
            } else {
                message.react("❌");
                message.reply('Vous devez précisez la raison de l\'attribution du rôle `' + prefix + 'timeout <@utilisateur> <raison de l\'attribution du rôle>`');
                return;
            }
        }
        if (message.deletable) {
            message.delete();
        }
    }
}
