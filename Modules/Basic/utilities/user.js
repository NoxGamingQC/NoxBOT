var statusType = {
    '0': 'Playing ',
    '1': 'Streaming ',
    '2': 'Listening ',
    '3': 'Watching ',
};

var statusColor = {
    'online': 4437377,
    'idle': 16426522,
    'dnd': 15746887,
    'offline': 7634829,

};
exports.command = function(message) {
    if (message.content === process.env.PREFIX + 'user') {
        message.channel.send({
            embed: {
                color: statusColor[message.author.presence.status],
                author: {
                    name: bot.user.username + ' - User information',
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: message.author.avatarURL
                },
                title: message.author.tag,
                description: message.author.presence.activities.name ? statusType[message.author.presence.activities.type] + ' ' + message.author.presence.activities.name : 'Not playing',
                fields: [
                    {
                        name: 'ID',
                        value: message.author.id,
                    },
                    {
                        name: 'Creation date',
                        value: message.author.createdAt,
                        inline: true,
                    },
                    {
                        name: 'Bot',
                        value: message.author.bot,
                        inline: true,
                    },
                    {
                        name: 'Streaming',
                        value: message.author.presence.activities.streaming ? 'Yes' : 'No',
                        inline: true,
                    },
                    {
                        name: 'Status',
                        value: message.author.presence.status,
                        inline: true,
                    },
                    {
                        name: 'Device',
                        value: message.author.presence.clientStatus ? Object.keys(message.author.presence.clientStatus)[0] : 'Offline',
                        inline: true,
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.username
                }
            }
        });
    }
};