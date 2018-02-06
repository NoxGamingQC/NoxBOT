
exports.commands = function (bot, modules, config, message) {
    const prefix = config.prefix;
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'rank') {
        if (parts[1] === 'join') {
            var role = message.guild.roles.find('name', '+' + parts[2]);
            if (role) {
                message.member.addRole(role.id);
                message.react("✅");
                message.reply('You joined ' + parts[2] + ' successfuly')
            } else {
                message.react("❌");
                message.reply(`This role does not exist`);
            }
        } else if (parts[1] === 'leave') {
            var role = message.guild.roles.find('name', '+' + parts[2]);
            if (role) {
                message.member.removeRole(role.id);
                message.react("✅");
                message.reply('You leaved ' + parts[2] + ' successfuly')
            } else {
                message.react("❌");
                message.reply(`This role does not exist`);
            }
        } else if (parts[1] === 'list') {
            var rolesList = [];
            message.guild.roles.forEach(function (role) {
                if (role.name.indexOf('+') !== -1) {
                    rolesList.push(role.name.replace('+', ''));
                }
            });
            if (rolesList.length) {
                roleString = rolesList.join(', ');
                message.react("✅");
                message.reply('There\'s a list of assignable roles: ```\n' + roleString + '```');
            } else {
                message.react("❌");
                message.reply(`You can't assign to yourself any roles on this server`);
            }
        }  else {
            message.react("❌");
            message.reply(`This command does not exist`);
        }
    }
}
