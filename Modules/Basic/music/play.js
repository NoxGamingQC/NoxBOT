exports.command = function(message) {
    if (message.content === process.env.PREFIX + 'play') {
        if(global.connection) {
            
        } else {
            message.reply('Please join a voice channel and run the command: `'+ process.env.PREFIX +'init`');
        }
    }
};