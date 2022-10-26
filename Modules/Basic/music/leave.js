exports.command = function(message) {
    if (message.content === process.env.PREFIX + 'leave') {
        if (!voiceChannel) {
            message.reply('i\'m not in a voice chat.');
        } else {
            voiceChannel.leave();
        }
    }
};