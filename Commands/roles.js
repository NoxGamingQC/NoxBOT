
exports.commands = function (bot, modules, config) {
    const prefix = config.prefix;
    bot.on('message', function (message) {
        Object.keys(config.assignable_roles).forEach(function (assignableRole) {
            if (message.content === prefix + 'rank join ' + assignableRole) {
                if (modules.rank.join) {
                    message.guild.roles.forEach(function (role) {
                        if (role.name == config.assignable_roles[assignableRole]) {
                            message.member.addRole(role.id);
                            message.react("✅");
                        }
                    });
                } else {
                    message.react("❌");
                    message.reply(`This command is not available for the moment`);
                }
            }
        });

        Object.keys(config.assignable_roles).forEach(function (assignableRole) {
            if (message.content === prefix + 'rank leave ' + assignableRole) {
                if (modules.rank.leave) {
                    message.guild.roles.forEach(function (role) {
                        if (role.name == config.assignable_roles[assignableRole]) {
                            message.member.removeRole(role.id);
                            message.react("✅");
                        }
                    });
                } else {
                    message.react("❌");
                    message.reply(`This command is not available for the moment`);
                }
            }
        });

        if (message.content === prefix + 'rank list') {
            if (modules.rank.leave) {
                var rankList = [];
                Object.keys(config.assignable_roles).forEach(function (assignableRole) {
                    rankList.push('+' + assignableRole);
                });
                var content = rankList.join('\n');
                message.reply('There is a list of joinable roles:\n```diff\n' + content + '```');
            } else {
                message.reply(`This command is not available for the moment`);
            }
        }
    });
}
