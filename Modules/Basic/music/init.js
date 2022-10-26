exports.command = function(message) {
    if ((message.content === process.env.PREFIX + 'init') ||(message.content === process.env.PREFIX + 'join')) {
        global.voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            message.reply('please join a voice channel first!');
        } else {
            voiceChannel.join()
            .then(connection => global.connection = connection)
            .catch(console.error);
        }
    }
};