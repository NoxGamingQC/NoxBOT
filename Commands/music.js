exports.commands = function (bot, modules, config, opus, ytdl, youtubeSearch) {
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

    bot.on('message', function (message) {
        var server = bot[message.guild.id];
        var args = message.content.split(' ');

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

        if (message.content === (prefix + "pause")) {
            connection.then(connexion => {
                dispatcher.pause();
            });
        }

        if (message.content === (prefix + "stop")) {
            connection.then(connexion => {
                dispatcher.end();
            });
        }

        if (message.content === (prefix + "resume")) {
            connection.then(connexion => {
                dispatcher.resume();
            });
        }

        if (message.content === (prefix + "leave")) {
            message.member.voiceChannel.leave();
            connection = null;
        }

        if (args[0] === (prefix + "play")) {
            if(connection) {
                if (!args[1]) {
                    message.react("❌");
                    return message.channel.send("Please send me a YouTube link or search terms!");
                }
                if (!message.member.voiceChannel) {
                    message.react("❌");
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
            } else {
                message.react("❌");
                message.reply(`Please use \`${prefix}init\` before starting playing music`);
            }
        }
    });
}
