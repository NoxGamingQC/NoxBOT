var request = require("../../../request.js");

exports.command = function(message) {
    if (message.content.includes(process.env.PREFIX + 'skin')) {
        var username = message.content.split(process.env.PREFIX + 'skin ', 2)[1];
        getMinecraftUserinfo(message, username)
    }
}

function getMinecraftUserinfo(message, username) {
    var url = "https://crafthead.net/profile/" + username;
    var data = {
        username: username;
    }
    request.get(url, "get", sendToDiscord, message, data);
}

function sendToDiscord(result, message, data) {
    message.channel.send({
        embed: {
            color: process.env.SUCCESS_COLOR,
            author: {
                name: bot.user.username + ' - MINECRAFT SKIN',
                icon_url: bot.user.avatarURL
            },
            image: {
                url: "https://crafthead.net/armor/body/" + username
            },
            title: result + ' Minecraft skin',
            description: 'Minecraft UUID' + `${result.id.uuid.substr(0, 8)}-${result.id.uuid.substr(8, 4)}-${result.id.uuid.substr(12, 4)}-${result.id.uuid.substr(16, 4)}-${result.id.uuid.substr(20, 12)}`,
        
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: message.author.username
            }
        }
    });
}