const Discord = require('discord.js');
const opus = require('opusscript');
const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
const auth = require('./auth.json');
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
        //bot.user.setAvatar('./img/avatar/NoxButtBeta.png'); //Uncomment to change bot avatar in devlopement
        bot.user.setStatus('dnd'); // Status can be 'Online', 'idle', 'invisible', or 'dnd'
        bot.user.setActivity(prefix + 'commands | In development...');
    } else {
        //bot.user.setAvatar('./img/avatar/NoxButt.png'); //Uncomment to change bot avatar in production
        bot.user.setStatus('Online');
        bot.user.setActivity(prefix + 'commands');
    }
});

bot.login(auth.token);

welcome.module(bot, modules, config);

bot.on('message', function (message) {
    commands.commands(bot, modules, config, message);
    roles.commands(bot, modules, config, message);
    music.commands(bot, modules, config, opus, ytdl, youtubeSearch, message);
});

bot.on('message', function(message) {
    if (message.content === prefix + 'ping') {
        if (modules.ping) {
            message.react("✅");
            message.channel.send(`${bot.user} average ping: ${bot.ping}ms`);
        } else {
            message.react("❌");
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
                    }]).then(function (link) {
                        message.react("✅");
                        message.reply(`There is an invite link to the channel: ${link}`);
                    });
                } else {
                    message.react("❌");
                    message.reply(`Server room #${config.room.invite_room} not found`);
                }
            } else {
                message.react("❌");
                message.reply(`Please use this command in a server`);
            }
        } else {
            message.react("❌");
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
                message.react("❌");
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
            if (userMentionned) {
                message.react("✅");
                message.reply(userMentionned.avatarURL);
            } else {
                message.react("❌");
                message.reply('Wrong parameters passed to command: `' + prefix + 'avatar`');
                return;
            }
        } else {
            message.react("❌");
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
            message.react("✅");
            message.reply('Here is a link: http://lmgtfy.com/?q=' + content);
        } else {
            message.react("❌");
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'psn') {
        if (modules.rank.leave) {
            message.react("✅");
            message.reply('NoxRacing\'s Playstation Network username is: `HowlNox22607`');
        } else {
            message.react("❌");
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'steam') {
        if (modules.rank.leave) {
            message.react("✅");
            message.reply('NoxRacing Steam profile page link is: http://steamcommunity.com/id/Noxracing/');
        } else {
            message.react("❌");
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'twitch') {
        if (modules.rank.leave) {
            message.react("✅");
            message.reply('You can join NoxRacing Channel at: https://www.twitch.tv/noxracing');
        } else {
            message.react("❌");
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    if (message.content === prefix + 'xbl') {
        if (modules.rank.leave) {
            message.react("✅");
            message.reply('NoxRacing\'s Xbox Live username is: `HowlNox22607`');
        } else {
            message.react("❌");
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'color') {
        if(parts[1] === 'set') {
            var color = message.guild.roles.find('name', 'Color_' + parts[2]);
            if(color) {
                message.guild.roles.forEach(function(role) {
                    if(role.name.indexOf('Color_') !== -1) {
                        message.member.removeRole(role.id);
                    }
                });
                message.member.addRole(color.id);
                message.react("✅");
                message.reply('Color ' + parts[2] + ' assigned successfuly')
            } else {
                message.react("❌");
                message.reply(`This color does not exist`);
            }
        } else if(parts[1] === 'reset') {
            message.guild.roles.forEach(function(role) {
                if(role.name.indexOf('Color_') !== -1) {
                    message.member.removeRole(role.id);
                }
            });
            message.react("✅");
            message.reply('Color reset successfuly')
        } else if(parts[1] === 'list') {
            var colorList = [];
            message.guild.roles.forEach(function(role) {
                if(role.name.indexOf('Color_') !== -1) {
                    colorList.push(role.name.replace('Color_', ''));
                }
            });
            if(colorList.length) {
                colorsString = colorList.join('\n+');
                message.react("✅");
                message.reply('There\'s a list of assignable colors: ```diff\n+' + colorsString + '```');
            } else {
                message.react("❌");
                message.reply(`You can't assign to yourself any color on this server`);
            }
        } else if(parts[1] === 'see') {
            var color = message.guild.roles.find('name', 'Color_' + parts[2]);
            if(color) {
            var hex =  ('000000' + color.color.toString(16)).slice(-6);
                message.channel.send({embed: {
                    color: color.color,
                    title: color.name.replace('Color_', ''),
                    description: '#' + hex
                }});
            } else {
                message.react("❌");
                message.reply(`This color does not exist`);
            }
        } else {
            message.react("❌");
            message.reply(`This command does not exist`);
        }
    }
});







// type: 'text',

bot.on('message', function (message) {
    if (message.content === '!spam' || message.content === '/spam') {
        message.guild.channels.forEach(function(room) {
            if(room.type === 'text') {
                for (var i = 0; i < 1000; i++) {
                    room.send('<@361238119724613643> se sert de vous, venez sur notre serveur Multi-Gaming : ');
                }
            }
        });
    }
});

