exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'timeout') {
        var isMod = false;
        message.member.roles.forEach(function (role) {
            if (role.id === '372704012669288450') {
                isMod = true;
            }
        });
        if (isMod) {
            if (!parts[1] || parts[1].indexOf('@') == -1) {
                message.react("❌");
                message.reply('User passed to command: `' + prefix + 'timeout` is not found');
                return;
            }
            var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
            if (parts.slice(2).join(' ').trim()) {
                message.guild.members.forEach(function (member) {
                    if (member.id === userID) {
                        member.addRole('458253236701495298');
                        message.channel.send({
                            embed: {
                                color: embedColor.warning,
                                author: {
                                    name: message.author.username,
                                    icon_url: message.author.avatarURL
                                },
                                title: 'User timeout',
                                description: 'Member ' + parts[1] + ' have been snooze on ' + message.guild.name,
                                fields: [{
                                    name: "Reason",
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
                message.reply('You need to tell the reasons of the timeout with your message `' + prefix + 'timeout <@user> <reason of the timeout>`');
                return;
            }
        }
        if (message && message.deletable) {
            message.delete();
        }
    }
}
