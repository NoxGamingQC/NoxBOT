exports.youtube = function (bot, modules, config, opus, ytdl, youtubeSearch, message) {
    const prefix = config.prefix;
    var connection = null;
    var dispatcher = null;
    const streamOptions = {
        seek: 0,
        volume: 1,
        bitrate: 96000
    };

    function play(server, message) {
        connection.then(connexion => {
            dispatcher = connexion.playStream(ytdl(server.queue[0], { filter: "audioonly" }));
            server.queue.shift();
            dispatcher.on("end", function () {
                if (server.queue[0]) {
                    play(server, message);
                }
                message.channel.send("Song Ended!");
            });
        });
    };

    function searchfunc(server, message) {
        var opts = {
            key: config.youtube_key,
        }
        var name = message.content.slice(6);
        console.log(name);
        youtubeSearch(name, opts, function (errors, results) {
            if (errors) {
                message.reaction = null;
                message.react("❌");
                message.reply("I got a problem adding `" + name + "` to the queue, please try again later");
                return;
            }
            message.reply("Adding " + results[0].link);
            server.queue.push(results[0].link)
            message.react("✅");
            play(server, message);
        });
    };
}
