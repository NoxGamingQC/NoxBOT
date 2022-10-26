exports.command = function(message, ytdl, streamOptions) {
    if (message.content === process.env.PREFIX + 'play') {
        if(global.connection) {
            var stream = ytdl('https://www.youtube.com/watch?v=l482T0yNkeo', { filter : 'audioonly' });
            global.connection.playStream(stream, streamOptions);
        } else {
            message.reply('Please join a voice channel and run the command: `'+ process.env.PREFIX +'init`');
        }
    }
};