exports.modules = function (bot, config, roomID) {
    bot.on('guildMemberAdd', function (member) {
        var channel = member.guild.channels.find(channel => channel.id === roomID);
        if (!channel) {
            return;
        }
        channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
    });
};
