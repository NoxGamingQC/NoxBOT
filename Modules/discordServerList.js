exports.updateServer = function(id, name, avatarURL) {
    if(process.env.WEBSITE_API_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        var server = {};
        server[id] = {
            id: id,
            name: name,
            avatar_url: avatarURL
        }
        $.ajax({
            url: process.env.WEBSITE_API_LINK + "discord/server/update",
            type: "POST",
            data: {
                website_token: process.env.WEBSITE_TOKEN,
                servers: server,
            }
        });
    }
}