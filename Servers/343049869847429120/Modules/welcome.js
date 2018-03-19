exports.modules = function (bot, config) {
    const prefix = config.prefix;
    bot.on('guildMemberAdd', function (member) {
        if (member.guild && member.guild.id == '343049869847429120') {
            var channel = member.guild.channels.find('id', '410782731006509082');
            channel.send(`${member}, bienvenue dans **${member.guild.name}** :wink:`);
        }
    });

    bot.on('guildMemberRemove', function (member) {
        if (member.guild && member.guild.id == '343049869847429120') {
            var channel = member.guild.channels.find('id', '410782731006509082');
            channel.send(`**${member}** vient de nous quitter. Bye bye **${member}** :sob:`);
        }
    });
};
