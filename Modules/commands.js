exports.commands = function (bot, modules, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'commands') {
        if (modules.commands) {
            message.author.send(`
                ${message.author}, Theres is the list of command you can use!

                **${prefix}commands:** Get ${bot.user} commands
                **${prefix}avatar <mentionned user>:** Show your avatar
                **${prefix}invite:** Create a 24h link to the server
                **${prefix}lmgtfy <search terms>:** Send you a LMGTFY link
                **${prefix}ping:** Show the bot ping
                **${prefix}psn:** Get NoxRacing's PSN Username
                **${prefix}steam:** Get NoxRacing's Steam profile link
                **${prefix}twitch:** Get NoxRacing's Twitch channel link
                **${prefix}xbl:** Get NoxRacing's Xbox Live Username
                **${prefix}rank list:** List of all joinable roles
                **${prefix}rank join <role>:** Make you join a role
                **${prefix}rank leave <role>:** Make you leave a role
                **${prefix}color set <color>:** Give you a color
                **${prefix}color reset:** Remove your color
                **${prefix}color see <color>:** Give you a demo of the color
                **${prefix}color list:** Give you a list of color
            `);
            `);
            message.react("✅");
            message.reply(`List of commands have been sent to your private message, go check them out! :wink:`);
        } else {
            message.react("❌");
            message.reply(`This command is not available for the moment`);
        }
    }
}
