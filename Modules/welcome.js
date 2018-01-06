exports.module = function (bot, modules, config) {
    if (modules.welcome_join) {
        bot.on('guildMemberAdd', function (member) {
            const channel = member.guild.channels.find('name', config.room.welcome_page_name);
            if (!channel) {
                return;
            }
            channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
        });
    }

    if (modules.welcome_leave) {
        bot.on('guildMemberRemove', function (member) {
            const channel = member.guild.channels.find('name', config.room.welcome_page_name);
            if (!channel) {
                return;
            }
            channel.send(`**${member}** just left us. Bye bye **${member}** :sob:`);
        });
    }
};
