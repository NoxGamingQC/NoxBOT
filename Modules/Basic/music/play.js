exports.command = function(message, ytdl, streamOptions) {
    if (message.content === process.env.PREFIX + 'play') {
        var search = message.split(process.env.PREFIX + 'play ')[1];
        var url = '';
        if(ytdl.validateURL(search)) {
            url = search;
        }
        if(global.connection) {
            if(url) {
                stream = ytdl(url, { filter : 'audioonly' });
                global.connection.playStream(stream, streamOptions);
            } else {
                message.reply('Song not found.');
            }
        } else {
            message.reply('Please join a voice channel and run the command: `'+ process.env.PREFIX +'init`');
        }
    }
};