exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    if (message.content === prefix + 'help') {
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' Help',
                    icon_url: bot.user.avatarURL
                },
                title: '',
                description: 'Hey there! I\'m a bot made by NoxGamingQC#3942.',
                thumbnail: {
                    url: bot.user.avatarURL
                },
                fields: [{
                    name: "​Commands",
                    value: 'To view a list of all commands, type `'+ prefix + 'commands`.'
                },
                {
                    name: "Support",
                    value: 'Found an error, or having trouble with the bot? Join the Discord [here](https://discord.gg/KPd4cC4) and we will assist you.'
                },
                {
                    name: "Invite",
                    value: '[Click here](https://discordapp.com/oauth2/authorize?client_id=395657323135238157&scope=bot&permissions=8) to invite me to your Discord server.'
                },
                {
                    name: "Website",
                    value: 'You can view my website at https://rebrand.ly/noxgamingqc'
                },
                {
                    name: "About",
                    value: 'I was made by NoxGamingQC#3942 with discord.js and the Twitch API. To see statistics and more, type `' + prefix + 'info`.'
                },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
}
