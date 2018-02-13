exports.module = function (bot, modules, config) {
    const prefix = config.prefix;
    if (modules.welcome_join) {
        bot.on('guildMemberAdd', function (member) {
            if(member.guild.id == '282902357862514688') { // Nox's Racing Circle
                member.addRole('410428761385992206');
            }
            if(member.guild.id == '410174046919983124') { // Communauté Multi-Gaming
                var channel = member.guild.channels.find('id', '410782731006509082');
                channel.send(`${member}, bienvenue dans **${member.guild.name}** :wink:`);
            }
        });
    }

    if (modules.welcome_leave) {
        bot.on('guildMemberRemove', function (member) {
            if(member.guild.id == '282902357862514688') { // Nox's Racing Circle
                const channel = member.guild.channels.find('name', config.room.welcome_page_name);
                if (!channel) {
                    return;
                }
                member.roles.forEach(function(role) {
                    if(role.id == '382941366419718153') {
                        var channel = member.guild.channels.find('id', '390268563757334529');
                        channel.send(`**${member}** vient de nous quitter. Bye bye **${member}** :sob:`);
                    }
                    if(role.id == '382941397537521666') {
                        var channel = member.guild.channels.find('id', '390268655440756737');
                        channel.send(`**${member}** just left us. Bye bye **${member}** :sob:`);
                    }
                });
            }
            if(member.guild.id == '410174046919983124') { // Communauté Multi-Gaming
                var channel = member.guild.channels.find('id', '410782731006509082');
                channel.send(`**${member}** vient de nous quitter. Bye bye **${member}** :sob:`);
            }
        });
    }

    bot.on('message', function (message) {
        var member = message.member;
        if(message.guild.id == '282902357862514688') { // Nox's Racing Circle
            member.roles.forEach(function(role) {
                if(role.id == '410428761385992206') {
                    if(message.content === prefix + 'lang fr') {
                        var channel = member.guild.channels.find('id', '390268563757334529');
                        channel.send(`${member}, bienvenue dans **${member.guild.name}** :wink:`);
                        member.addRole('382941366419718153');
                        member.removeRole('410428761385992206');
                    }
                    if(message.content === prefix + 'lang en') {
                        var channel = member.guild.channels.find('id', '390268655440756737');
                        channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
                        member.addRole('382941397537521666');
                        member.removeRole('410428761385992206');
                    }
                } 
            });
        }
    });
};
