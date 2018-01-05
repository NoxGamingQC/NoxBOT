const Discord = require('discord.js');
const opus = require('opusscript');
const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
const config = require('./config.json');
const modules = require('./commands.json');
const roles = require('./Modules/roles.js');
const music = require('./Modules/music.js');
const commands = require('./Modules/commands.js');
const welcome = require('./Modules/welcome.js');

const bot = new Discord.Client({autoReconnect:true});
const prefix = config.prefix;

bot.on('ready', function () {
    console.log("Bot Launched...");
    if(config.development) {
        bot.user.setStatus('dnd'); // Status can be 'OnLine', 'idle', 'invisible', or 'dnd'
        bot.user.setGame(prefix + 'commands | In development...');
    } else {
        bot.user.setStatus('Online');
        bot.user.setGame(prefix+'commands');
    }
});

bot.login(config.token);

welcome.module(bot, modules, config);

bot.on('message', function (message) {
    commands.commands(bot, modules, config, message);
    roles.commands(bot, modules, config, message);
    music.commands(bot, modules, config, opus, ytdl, youtubeSearch, message);
});

bot.on('message', function(message) {
    if (message.content === prefix + 'ping') {
        if(modules.ping) {
            message.channel.send(`${bot.user} average ping: ${bot.ping}ms`);
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }

    if (message.content === prefix + 'invite') {
        if(modules.invite) {
            var server = message.guild;
            if(server) {
                var channel = server.channels.find('name', config.room.invite_room);
                if(channel) {
                    channel.createInvite([options => {
                        maxAge: 86400
                    }]).then(function(link) {
                        message.reply(`There is an invite link to the channel: ${link}`);
                    });
                } else {
                    message.reply(`Server room #${config.room.invite_room} not found`);
                }
            } else {
                message.reply(`Please use this command in a server`);
            }
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function(message) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if(commandName === prefix+'avatar') {
        if(modules.avatar) {
            if (!parts[1] || parts[1].indexOf('@') == -1) {
                message.reply('Wrong parameters passed to command: `' + prefix + 'avatar`');
                return;
            }
            var userID = parts[1].replace('@', '').replace('<', '').replace('>', '');
            var userMentionned = null;
            bot.users.forEach(function(user) {
                if(user.id === userID) {
                    userMentionned = user;
                };
            });
            if(userMentionned) {
                message.reply(userMentionned.avatarURL);
            } else {
                message.reply('Wrong parameters passed to command: `' + prefix + 'avatar`');
                return;
            }
        }  else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'lmgtfy') {
        if (modules.lmgtfy) {
            parts.forEach(function(word, key) {
                if(key == 1) {
                    content = word;
                }
                if(key > 1) {
                    content += '+'+word;
                }
            });
            message.reply('Here is a link: http://lmgtfy.com/?q=' + content);
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'psn') {
        if (modules.rank.leave) {
            message.reply('NoxRacing\'s Playstation Network username is: `HowlNox22607`');
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'steam') {
        if (modules.rank.leave) {
            message.reply('NoxRacing Steam profile page link is: http://steamcommunity.com/id/Noxracing/');
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'twitch') {
        if (modules.rank.leave) {
            message.reply('You can join NoxRacing Channel at: https://www.twitch.tv/noxracing');
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'xbl') {
        if (modules.rank.leave) {
            message.reply('NoxRacing\'s Xbox Live username is: `HowlNox22607`');
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

