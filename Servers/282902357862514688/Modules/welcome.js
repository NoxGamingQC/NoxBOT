exports.modules = function (bot, config) {
    bot.on('guildMemberAdd', function (member) {
        if (member.guild && member.guild.id == '282902357862514688') {
            member.addRole('410428761385992206');
        }
    });

    bot.on('guildMemberRemove', function (member) {
        if (member.guild && member.guild.id == '282902357862514688') {
            const channel = member.guild.channels.find('name', config.room.welcome_page_name);
            if (!channel) {
                return;
            }
            member.roles.forEach(function (role) {
                if (role.id == '382941366419718153') {
                    var channel = member.guild.channels.find('id', '390268563757334529');
                    channel.send(`**${member}** vient de nous quitter. Bye bye **${member}** :sob:`);
                }
                if (role.id == '382941397537521666') {
                    var channel = member.guild.channels.find('id', '390268655440756737');
                    channel.send(`**${member}** just left us. Bye bye **${member}** :sob:`);
                }
            });
        }
    });
};

exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    var member = message.member;
    member.roles.forEach(function (role) {
        if (role.id == '410428761385992206') {
            if (message.content === prefix + 'lang fr') {
                var channel = member.guild.channels.find('id', '390268563757334529');
                channel.send(`${member}, bienvenue dans **${member.guild.name}** :wink:`);
                member.addRole('382941366419718153');
                member.removeRole('410428761385992206');
            }
            if (message.content === prefix + 'lang en') {
                var channel = member.guild.channels.find('id', '390268655440756737');
                channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
                member.addRole('382941397537521666');
                member.removeRole('410428761385992206');
            }
        }
    });
}
