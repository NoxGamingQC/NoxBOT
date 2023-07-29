exports.updateServer = function(id, name, avatarURL) {
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