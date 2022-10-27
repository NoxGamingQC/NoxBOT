exports.command = function(message) {
    if (message.content === process.env.PREFIX + 'leave') {
        this.leave(message);
    }
};

exports.leave = function(message) {
    if (!voiceChannel) {
        message.reply('i\'m not in a voice channel.');
    } else {
        voiceChannel.leave();
        message.reply('i left your voice channel.');
    }
};