exports.modules = function (bot, config, roomID) {
    bot.on('guildMemberAdd', function (member) {
        var channel = member.guild.channels.find('id', roomID);
        if (!channel) {
            return;
        }
        channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
    });

    bot.on('guildMemberRemove', function (member) {
        var channel = member.guild.channels.find('id', roomID);
        if(!channel) {
            return;
        }
        channel.send(`**${member}** just left us. Bye bye **${member}** :sob:`);
    });
};
