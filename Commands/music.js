exports.commands = function (bot, modules, config, opus, ytdl, youtubeSearch) {
    const prefix = config.prefix;
    var connection = null;
    const streamOptions = {
        seek: 0,
        volume: 1,
        bitrate: 96000
    };

    function play(server, message) {
        console.log(bot.user);
        if(!connection) {
            message.react("❌");
            message.reply(`Please use ${prefix}init before starting playing music`);
            return;
        }
        connection.then(connexion => {
            dispatcher = connexion.playStream(ytdl(server.queue[0], { filter: "audioonly" }));
            server.queue.shift();
            dispatcher.on("end", function () {
                if (server.queue[0]) {
                    play(server, message);
                }
                message.channel.send("Song Finished...")
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
                message.react("❌");
                message.reply("Erreur - cannot add " + results[0].link + ", try again later");
                return;
            }
            message.react("✅");
            server.queue.push(results[0].link)
            message.reply("Adding " + results[0].link);
            play(server, message);
        });
    };

    bot.on('message', function (message) {
        var server = bot[message.guild.id];
        if (message.content === (prefix + "list")) {
            if (server) {
                var queueList = server.queue.join('\n');
                message.reply(queueList);
            } else {
                message.reply('Nothing in the queue');
            }
        }

        if (message.content === (prefix + "init")) {
            connection = message.member.voiceChannel.join();
        }

        if (message.content === (prefix + "leave")) {
            message.member.voiceChannel.leave();
        }

        var args = message.content.split(' ');
        if (args[0] === (prefix + "play")) {
            if (!args[1]) {
                return message.channel.send("Please send a link/name...");
            }
            if (!message.member.voiceChannel) {
                return message.reply("Please join a voice channel first!");
            }
            if (!bot[message.guild.id]) {
                bot[message.guild.id] = {
                    queue: [],
                }
            }
            var server = bot[message.guild.id]
            if (args[1].startsWith("http")) {
                server.queue.push(args[1]);
                message.reply("Adding " + args[1]);
                play(server, message);
            } else {
                searchfunc(server, message);
            }
        }
    });
}
