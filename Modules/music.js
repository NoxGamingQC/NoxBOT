const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
var connection = null;
var dispatcher = null;
const streamOptions = {
    seek: 0,
    volume: 1,
    bitrate: 96000
};

exports.commands = function (bot, auth, config, opus, message) {
    const prefix = config.prefix;
    var args = message.content.split(' ');
    
    if (message.content === (prefix + "list")) {
        var server = bot[message.guild.id];
        if (server) {
            var queueList = server.queue.join('\n');
            message.reply(queueList);
        } else {
            message.reply('Nothing in the queue');
        }
    }

    if (message.content === (prefix + "init")) {
        connection = getConnection(message).join();
    }

    if (message.content === (prefix + "pause")) {
        getConnection(message).then(connexion => {
            dispatcher.pause();
        });
    }

    if (message.content === (prefix + "stop")) {
        getConnection(message).then(connexion => {
            dispatcher.end();
        });
    }

    if (message.content === (prefix + "resume")) {
        getConnection(message).then(connexion => {
            dispatcher.resume();
        });
    }

    if (message.content === (prefix + "leave")) {
        message.member.voiceChannel.leave();
        connection = null;
    }

    if (args[0] === (prefix + "play")) {
        if (getConnection(message)) {
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
                play(message);
            } else {
                searchfunc(message);
            }
        } else {
            message.react("❌");
            message.reply(`Please use \`${prefix}init\` before starting playing music`);
        }
    }

    function play(message) {
        var server = bot[message.guild.id];
        connection.then(connexion => {
            console.log(server.queue[0])
            dispatcher = connexion.playStream(ytdl(server.queue[0], { filter: "audioonly" }));
            server.queue.shift();
            dispatcher.on("end", function () {
                if (server.queue[0]) {
                    play(message);
                }
                message.channel.send("Song Ended!");
            });
            stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
            dispatcher = connexion.playStream(stream, streamOptions);
        });
    };

    function getConnection(message) {
        return message.member.voiceChannel;
    }

    function searchfunc(message) {
        var server = bot[message.guild.id];
        var opts = {
            key: auth.youtube_key,
        }
        var name = message.content.slice(6);
        console.log(name);
        youtubeSearch(name, opts, function (errors, results) {
            if (errors) {
                console.log(errors);
                message.reaction = null;
                message.react("❌");
                message.reply("I got a problem adding `" + name + "` to the queue, please try again later");
                return;
            }
            message.reply("Adding " + results[0].link);
            server.queue.push(results[0].link)
            message.react("✅");
            play(message);
        });
    };
}
