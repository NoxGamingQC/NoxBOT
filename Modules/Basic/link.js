exports.command = function(message) {
    if(message.channel.type === 'dm') {
        if (message.content === process.env.PREFIX + 'link') {
            $.ajax({
                url: process.env.WEBSITE_API_LINK + "/link/new",
                type: "POST",
                data: {
                    website_token: process.env.WEBSITE_TOKEN,
                    discord_id: userID,
                    platform: 'discord'
                },
                success: function(result) {
                    message.reply('Your token is: ' + result);
                },
                error() {
                    message.reply('An error happen. Please try again later.');
                }
            });
        }
    }
}