exports.commands = function (message, prefix) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'lmgtfy') {
        parts.forEach(function (word, key) {
            if (key == 1) {
                content = word;
            }
            if (key > 1) {
                content += '+' + word;
            }
        });
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - LMGTFY',
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: 'http://lmgtfy.com/assets/sticker-b222a421fb6cf257985abfab188be7d6746866850efe2a800a3e57052e1a2411.png'
                },
                title: 'Let me Google that for you',
                description: 'There we go: http://lmgtfy.com/?iie=1&q=' + content,
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
