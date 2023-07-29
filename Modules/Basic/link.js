var discordUserList = require('./Modules/discordUserList.js');

exports.command = function(message) {
    if(message.channel.type === 'dm') {
        discordUserList.update(message.author.id, message.author.username)
        if (message.content === process.env.PREFIX + 'link') {
            $.ajax({
                url: process.env.WEBSITE_API_LINK + "link/new",
                type: "POST",
                data: {
                    website_token: process.env.WEBSITE_TOKEN,
                    discord_id: message.author.id,
                    platform: 'discord'
                },
                success: function(result) {
                    message.reply('Your token is: `' + result + '`');
                },
                error: function() {
                    message.reply('An error happen. Please try again later.');
                }
            });
        }
    }
}