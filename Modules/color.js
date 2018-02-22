exports.commands = function (config, message) {
    const prefix = config.prefix;
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'color') {
        if (message.guild) {
            if (parts[1] === 'set') {
                var color = message.guild.roles.find('name', 'Color_' + parts[2]);
                if (color) {
                    message.guild.roles.forEach(function (role) {
                        if (role.name.indexOf('Color_') !== -1) {
                            message.member.removeRole(role.id);
                        }
                    });
                    message.member.addRole(color.id);
                    message.react("✅");
                    message.reply('Color ' + parts[2] + ' assigned successfuly')
                } else {
                    message.react("❌");
                    message.reply(`This color does not exist`);
                }
            } else if (parts[1] === 'reset') {
                message.guild.roles.forEach(function (role) {
                    if (role.name.indexOf('Color_') !== -1) {
                        message.member.removeRole(role.id);
                    }
                });
                message.react("✅");
                message.reply('Color reset successfuly')
            } else if (parts[1] === 'list') {
                var colorList = [];
                message.guild.roles.forEach(function (role) {
                    if (role.name.indexOf('Color_') !== -1) {
                        colorList.push(role.name.replace('Color_', ''));
                    }
                });
                if (colorList.length) {
                    colorsString = colorList.join('\n+');
                    message.react("✅");
                    message.reply('There\'s a list of assignable colors: ```diff\n+' + colorsString + '```');
                } else {
                    message.react("❌");
                    message.reply(`You can't assign to yourself any color on this server`);
                }
            } else if (parts[1] === 'see') {
                var color = message.guild.roles.find('name', 'Color_' + parts[2]);
                if (color) {
                    var hex = ('000000' + color.color.toString(16)).slice(-6);
                    message.channel.send({
                        embed: {
                            color: color.color,
                            title: color.name.replace('Color_', ''),
                            description: '#' + hex
                        }
                    });
                } else {
                    message.react("❌");
                    message.reply(`This color does not exist`);
                }
            } else {
                message.react("❌");
                message.reply(`This command does not exist`);
            }
        } else {
            message.react("❌");
            message.reply(`You must be in a server to use this command`);
        }
    }
}
