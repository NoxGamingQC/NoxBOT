
var init = require("./init.js");
var ytdl = require('ytdl-core');
var youtubeSearchAPI = require("youtube-search-api");

exports.command = function(message, streamOptions) {
    if (message.content.includes(process.env.PREFIX + 'play')) {
        var search = message.content.split(process.env.PREFIX + 'play ')[1];
        var url = '';
        if(!global.connection) {
            init.init(message);
        }
        if(ytdl.validateURL(search)) {
            url = search;
            if(ytdl.validateURL(url) && search.length > 0) {
                stream = ytdl(url,streamOptions).on('info', (info) => {
                    message.channel.send('🎵 Now playing: `' + info.videoDetails.title + '`');
                });
                global.connection.playStream(stream, {type: 'opus'});
            } else {
                message.reply('Song not found.');
            }
        } else {
            youtubeSearchAPI.GetListByKeyword(search, false, 1, [{type:'video'}])
            .then((response) => {
                message.channel.send('🎵 Now playing: `' + response.items[0].title + '`');
                url = 'https://www.youtube.com/watch?v=' + response.items[0].id;
                if(ytdl.validateURL(url) && search.length > 0) {
                    stream = ytdl(url,streamOptions);
                    global.connection.playStream(stream, {type: 'opus'});
                } else {
                    message.reply('Song not found.');
                }
            });
        }
    }
};