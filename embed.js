exports.send = function (message, color, moduleName, title, description, fields = null, thumbnail = null, imageURL = null) {
    var embedData = {
        embed: {
            color: color,
            author: {
                name: bot.user.username + ' ' + moduleName,
                icon_url: bot.user.avatarURL
            },
            title: title,
            description: description,
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: message.author.tag
            }
        }
    }

    if(fields) {
        embedData.embed.fields = fields;
    }

    if(thumbnail) {
        embedData.embed.thumbnail = {
            url: thumbnailURL
        }
    }

    if(imageURL) {
        embedData.embed.image = {
            url: imageURL
        }
    }

    message.channel.send(embedData);
}
