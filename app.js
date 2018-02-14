const Discord = require('discord.js');
const opus = require('opusscript');
const ytdl = require('ytdl-core');
const youtubeSearch = require('youtube-search');
const auth = require('./auth.json');
const config = require('./config.json');
const roles = require('./Modules/roles.js');
const music = require('./Modules/music.js');
const commands = require('./Modules/commands.js');
const linksCommands = require('./Modules/links.js');
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

welcome.module(bot, config);

bot.on('message', function (message) {
    commands.commands(bot, config, message);
    roles.commands(bot, config, message);
    linksCommands.commands(bot, config, message);
    //music.commands(bot, config, opus, ytdl, youtubeSearch, message);
});

bot.on('message', function(message) {
    if(message.guild && message.guild.id == '282902357862514688') {
        if (message.content === prefix + 'ping') {
            message.react("✅");
            message.channel.send(`${bot.user} average ping: ${bot.ping}ms`);
        }
    }

    if (message.content === prefix + 'invite') {
        if(message.guild && message.guild.id == '282902357862514688') {
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
        }
    }
});

bot.on('message', function(message) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if(commandName === prefix+'avatar') {
        if(message.guild && message.guild.id == '282902357862514688') {
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
        }
    }
});

bot.on('message', function (message) {
    if(message.guild && message.guild.id == '282902357862514688') {
        var parts = message.content.split(" ");
        if (parts[0] === prefix + 'lmgtfy') {
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
        }
    }
});

bot.on('message', function (message) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'color') {
        if(message.guild) {
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
        } else {
            message.react("❌");
            message.reply(`You must be in a server to use this command`);
        }
    }
});



bot.on('message', function (message) {
    if (message.content === prefix + 'warframe codes') {
        var codeList = '';
        message.reply({
            embed: {
                color: '9846215',
                title: 'Warframe promo codes',
                description: 'You can redeem these Warframe promo codes on the in game market or on the website under the section promo codes',
                fields: [{
                    name: "These are some Warframe Partner Glyphs code",
                    value: "- IFLYNN\n- TACTICALPOTATO\n- MOGAMU\n- SKILLUP\n- ORIGINALWICKEDFUN\n- ADMIRALBAHROO\n- SP00NERISM\n- BIKEMAN\n- SUMMIT1G\n- KINGGOTTHALION\n- MCIK\n- TVSBOH\n- HOMIINVOCADO\n- BRICKY"
                },
                {
                    name: "Free Heat Sword and a weapon slot",
                    value: "- FREESWORD"
                },
                {
                    name: "Get a free Vectis, a free weapon slot and the Vectis Tekulu skin",
                    value: "- FN6B-8RML-MLH6-GM2N"
                }]
            }
        });
        message.delete();
    }
});
