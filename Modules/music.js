const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
var connection = null;
var dispatcher = null;
const auth = require('../auth.json');

const streamOptions = {
    seek: 0,
    volume: 1,
    bitrate: 96000
};

exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
   var args = message.content.split(' ');

    if (message.content === (prefix + "list")) {
        var server = bot[message.guild.id];
        if (server) {
            var queueList = server.queue.join('\n');
            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: bot.user.username + ' - Music',
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Song Queue',
                    description: queueList,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
        } else {
            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: bot.user.username + ' - Music',
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Song Queue',
                    description: 'There\'s nothing in the queue',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
        }
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === (prefix + "init")) {
        connection = message.member.voiceChannel.join();
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Music',
                    icon_url: bot.user.avatarURL
                },
                title: 'Music Initialization',
                description: bot.user.username + ' is now connected to your vocal room',
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === (prefix + "pause")) {
        connection.then(connexion => {
            dispatcher.pause();
        });
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Music',
                    icon_url: bot.user.avatarURL
                },
                title: 'Music Paused',
                description: 'Current song has been paused',
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === (prefix + "stop")) {
        connection.then(connexion => {
            dispatcher.end();
        });
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Music',
                    icon_url: bot.user.avatarURL
                },
                title: 'Music stopped',
                description: 'Current song has been stopped',
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === (prefix + "resume")) {
        connection.then(connexion => {
            dispatcher.resume();
        });

        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Music',
                    icon_url: bot.user.avatarURL
                },
                title: 'Music resumed',
                description: 'Current song has been resumed',
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (message.content === (prefix + "leave")) {
        message.member.voiceChannel.leave();
        connection = null;
        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' - Music',
                    icon_url: bot.user.avatarURL
                },
                title: 'Music bot left',
                description: bot.user.username + ' has left your vocal room',
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }

    if (args[0] === (prefix + "play")) {
        if (connection) {
            if (!args[1]) {
                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error - Missing parameters',
                        description: 'Please send me a YouTube link or some search terms!',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
                if (message && message.deletable) {
                    message.delete();
                }
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error - Member not found',
                        description: 'Please join a voice channel before summoning me!',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
                if (message && message.deletable) {
                    message.delete();
                }
                return;
            }
            if (!bot[message.guild.id]) {
                bot[message.guild.id] = {
                    queue: [],
                }
            }
            var server = bot[message.guild.id]
            if (args[1].startsWith("https") || args[1].startsWith("http")) {
                server.queue.push(args[1]);
                message.reply("Adding " + args[1]);
                play(message);
            } else {
                searchfunc(message);
            }
        } else {
            message.channel.send({
                embed: {
                    color: embedColor.error,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Song Initialization failed',
                    description: 'Please use `' + prefix + 'init` before starting playing music',
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            if (message && message.deletable) {
                message.delete();
            }
            return;
        }
    }

    function play(message) {
        var server = bot[message.guild.id];
        if (connection) {
            connection.then(connexion => {
                if (server.queue[0]) {
                    dispatcher = connexion.playStream(ytdl(server.queue[0], { filter: 'audioonly' }), streamOptions);
                }
                dispatcher.on("end", function () {
                    message.channel.send({
                        embed: {
                            color: embedColor.success,
                            author: {
                                name: bot.user.username + ' - Music',
                                icon_url: bot.user.avatarURL
                            },
                            title: 'Music ended',
                            description: 'The current song has ended',
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                    server.queue.shift();
                    if (server.queue[0]) {
                        message.channel.send({
                            embed: {
                                color: embedColor.success,
                                author: {
                                    name: bot.user.username + ' - Music',
                                    icon_url: bot.user.avatarURL
                                },
                                title: 'Next Song',
                                description: 'Now playing the next song!',
                                timestamp: new Date(),
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: message.author.tag
                                }
                            }
                        });
                        play(message);
                    }
                });
            }).catch(function(error) {
                if (error) {
                    reportError(error);
                    console.error;
                }
            });
        }
    };

    function searchfunc(message) {
        var server = bot[message.guild.id];
        var opts = {
            key: auth.youtube_key,
        }
        var name = message.content.slice(6);
        youtubeSearch(name, opts, function (errors, results) {
            if (errors) {
                console.log(errors);
                message.reaction = null;

                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error - Song search failed',
                        description: 'I got a problem adding ' + name + ' to the queue, please try again later',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
                if (message && message.deletable) {
                    message.delete();
                }
                return;
            }
            message.channel.send({
                embed: {
                    color: embedColor.success,
                    author: {
                        name: bot.user.username + ' - Song Added',
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Title',
                    description: results[0].title,
                    timestamp: new Date(),
                    fields: [{
                        name: "Author",
                        value: results[0].channelTitle
                    },
                    {
                        name: "Description",
                        value: results[0].description
                    },
                    {
                        name: "Published date",
                        value: results[0].publishedAt
                    },
                    {
                        name: "Video link",
                        value: results[0].link
                    }],
                    image: {
                        url: results[0].thumbnails.high.url,
                        width: results[0].thumbnails.high.width,
                        height: results[0].thumbnails.high.height
                    },
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            });
            server.queue.push(results[0].link)

            if (message && message.deletable) {
                message.delete();
            }
            if(!dispatcher) {
                play(message);
            }
        });
    };
}
