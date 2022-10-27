exports.command = function(message) {
    if ((message.content === process.env.PREFIX + 'init') ||(message.content === process.env.PREFIX + 'join')) {
        this.init(message);
    }
};

exports.init = function(message) {
    global.voiceChannel = message.member.voiceChannel;
    if (!message.member.voiceChannel) {
        message.reply('please join a voice channel first!');
    } else {
        if(message.member.voiceChannel.joinable) {
            message.member.voiceChannel.join()
            .then(function(connection) {
                global.connection = connection;   
                message.reply('I\'m connected to your voice channel!');
            })
            .catch(console.error);
        } else {
            message.reply('I don\'t have the permission to join that voice channel!');
        }
    }
};