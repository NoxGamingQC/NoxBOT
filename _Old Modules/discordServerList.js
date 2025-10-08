exports.updateServer = function(id, name, avatarURL) {
    if(process.env.WEBSITE_API_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        var discordServer = {};
        discordServer[id] = {
            id: id,
            name: name,
            avatar_url: avatarURL
        }
        $.ajax({
            url: process.env.WEBSITE_API_LINK + "discord/server/update",
            type: "POST",
            data: {
                website_token: process.env.WEBSITE_TOKEN,
                servers: discordServer,
            }
        });
    }
}

exports.getServerConfig = function(guild, message, handleMessage) {
    if(process.env.ENVIRONEMENT == 'production') {
        $.ajax({
            url: process.env.WEBSITE_API_LINK + "discord/config/get/" + guild.id,
            type: "GET",
            success: function(result) {
                handleMessage(message, result)
            }
        });
    } else {
        handleMessage(message, {
            id: guild.id,
            avatar_url: guild.iconURL,
            prefix: process.env.PREFIX,
            can_receive_points: false,
            name: guild.name
        })
    }
}