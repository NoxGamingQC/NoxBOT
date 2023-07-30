var request = require("../../../Essentials/request.js");

exports.command = function(message, prefix) {
    if (message.content.includes(prefix + 'skin')) {
        var username = message.content.split(process.env.PREFIX + 'skin ', 2)[1];
        getMinecraftUserinfo(message, username)
    }
}

function getMinecraftUserinfo(message, username) {
    var url = "https://crafthead.net/profile/" + username;
    var data = {
        username: username
    }
    request.get(url, "get", sendToDiscord, message, data);
}

function sendToDiscord(response, message, data) {
    var result = JSON.parse(response);
    message.channel.send({
        embed: {
            color: process.env.SUCCESS_COLOR,
            author: {
                name: bot.user.username + ' - MINECRAFT SKIN',
                icon_url: bot.user.avatarURL
            },
            image: {
                url: "https://crafthead.net/armor/body/" + data.username
            },
            title: result.name + '\'s Minecraft skin',
            description: 'UUID: ' + result.id.substr(0, 8) + "-" + result.id.substr(8, 4) + "-" + result.id.substr(12, 4) + "-" + result.id.substr(16, 4) + "-" + result.id.substr(20, 12) + 
                        '\nShorten UUID: ' + result.id,
        
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: message.author.username
            }
        }
    });
}