exports.commands = function (bot, modules, config, opus, ytdl, youtubeSearch, message) {
    const prefix = config.prefix;
    const youtube = require('./youtube.js');
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
                youtube.youtube(bot, modules, config, opus, ytdl, youtubeSearch).play(server, message);
            } else {
                youtube.youtube(bot, modules, config, opus, ytdl, youtubeSearch, message).searchfunc(server, message);
            }
        } else {
            message.react("❌");
            message.reply(`Please use \`${prefix}init\` before starting playing music`);
        }
    }
}
