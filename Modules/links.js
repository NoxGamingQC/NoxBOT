exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.guild && message.guild.id == '282902357862514688') {
        if (message.content === prefix + 'psn') {
            message.react("✅");
            message.reply('NoxRacing\'s Playstation Network username is: `HowlNox22607`');
        }

        if (message.content === prefix + 'steam') {
            message.react("✅");
            message.reply('NoxRacing Steam profile page link is: http://steamcommunity.com/id/Noxracing/');
        }
        if (message.content === prefix + 'twitch') {
            message.react("✅");
            message.reply('You can join NoxRacing Channel at: https://www.twitch.tv/noxracing');
        }
        if (message.content === prefix + 'xbl') {
            message.react("✅");
            message.reply('NoxRacing\'s Xbox Live username is: `HowlNox22607`');
        }
    }
}
