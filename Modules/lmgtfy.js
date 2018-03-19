exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
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
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'LMGTFY Link',
                description: 'There is a link: http://lmgtfy.com/?q=' + content,
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.username
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
