const Discord = require('discord.js');
const opus = require('opusscript');
const auth = require('./auth.json');
const config = require('./config.json');
const roles = require('./Modules/roles.js');
const music = require('./Modules/music.js');
const commands = require('./Modules/commands.js');
const color = require('./Modules/color.js');
const linksCommands = require('./Modules/links.js');
const welcome = require('./Modules/welcome.js');

const bot = new Discord.Client({autoReconnect:true});
const prefix = config.prefix;

bot.on('ready', function () {
    console.log("Bot Launched...");
    if(config.development) {
        //bot.user.setAvatar('./img/avatar/NoxButtBeta.png'); //Uncomment to change bot avatar in devlopement
        bot.user.setStatus('dnd');
        bot.user.setActivity(prefix + 'commands | Testing 1..2..3', { 'url': 'https://www.twitch.tv/noxracing', 'type':'STREAMING'});
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
    color.commands(config, message);
    linksCommands.commands(bot, config, message);
    //music.commands(bot, auth, config, opus, message);
});

bot.on('message', function(message) {
    if(message.guild && message.guild.id == '282902357862514688') {
        if (message.content === prefix + 'ping') {
            message.channel.send({
                embed: {
                    color: '11141120',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: bot.user.username + ' ping',
                    description: `Average ping: ${bot.ping}ms`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
            if (message.deletable) {
                message.delete();
            }
        }
    }

    if (message.content === prefix + 'invite') {
        if(message.guild) {
            if (message.guild.id == '282902357862514688') {
            var server = message.guild;
                if(server) {
                    var channel = server.channels.find('id', '383695542452092929');
                    if(channel) {
                        channel.createInvite([options => {
                            maxAge: 86400
                        }]).then(function (link) {
                            message.channel.send({
                                embed: {
                                    color: '11141120',
                                    author: {
                                        name: message.author.username,
                                        icon_url: message.author.avatarURL
                                    },
                                    title: 'Invite link',
                                    description: `${link}`,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: bot.user.avatarURL,
                                        text: 'Invite link are valid only for 24h'
                                    }
                                }
                            })
                        });
                    } else {
                        message.channel.send({
                            embed: {
                                color: '16711680',
                                author: {
                                    name: message.author.username,
                                    icon_url: message.author.avatarURL
                                },
                                title: 'Error - Invite link',
                                description: `Cannot create invite link to the server`,
                                timestamp: new Date(),
                                footer: {
                                    icon_url: bot.user.avatarURL,
                                    text: bot.user.username
                                }
                            }
                        });
                    }
                }
            }
        } else {
            message.channel.send({
                embed: {
                    color: '16711680',
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    title: 'Error - Invite link',
                    description: `Please use this command in a server`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        }
        if (message.deletable) {
            message.delete();
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
    if (message.content === prefix + 'warframe codes') {
        var codeList = '';
        message.reply({
            embed: {
                color: '9846215',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Warframe promo codes',
                description: 'You can redeem these Warframe promo codes on the in game market or on the website under the section promo codes',
                fields: [{
                    name: "These are some Warframe Partner Glyphs code",
                    value: "- ADMIRALBAHROO\n- BIKEMAN\n- BRICKY\n- HOMIINVOCADO\n- IFLYNN\n- KINGGOTTHALION\n- MCIK\n- MOGAMU\n- N00BLSHOWTEK\n- ORIGINALWICKEDFUN\n- SKILLUP\n- SP00NERISM\n- SUMMIT1G\n- TACTICALPOTATO\n- TVSBOH"
                },
                {
                    name: "Free Heat Sword and a weapon slot",
                    value: "- FREESWORD"
                },
                {
                    name: "Get a free Vectis, a free weapon slot and the Vectis Tekulu skin",
                    value: "- FN6B-8RML-MLH6-GM2N"
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Code can be used only once by account"
                }
            }
        });
    }
});


bot.on('message', function (message) {
    if (message.content === prefix + 'kiwis') {
        message.channel.send('🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝🥝');
    }
});


//Nox
bot.on('message', function (message) {
    if(message.guild) {
        if (message.guild.id === '282902357862514688') {
            var parts = message.content.split(" ");
            if (parts[0] === prefix + 'timeout') {
                var isMod = false;
                message.member.roles.forEach(function(role) {
                    if (role.id === '372704012669288450') {
                        isMod = true;
                    }
                });
                if (isMod) {
                    if (!parts[1] || parts[1].indexOf('@') == -1) {
                        message.react("❌");
                        message.reply('User passed to command: `' + prefix + 'timeout` is not found');
                        return;
                    }
                    var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
                    if (parts.slice(2).join(' ').trim()) {
                        message.guild.members.forEach(function(member) {
                            if(member.id === userID) {
                                member.addRole('415944725460156416');
                                message.channel.send({
                                    embed: {
                                        color: '2536811',
                                        author: {
                                            name: message.author.username,
                                            icon_url: message.author.avatarURL
                                        },
                                        title: 'User timeout',
                                        description: 'Member ' + parts[1] + ' have been snooze on ' + message.guild.name,
                                        fields: [{
                                            name: "Reason",
                                            value: parts.slice(2).join(' ')
                                        }],
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: bot.user.avatarURL,
                                            text: bot.user.username,
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        message.react("❌");
                        message.reply('You need to tell the reasons of the timeout with your message `'+ prefix + 'timeout <@user> <reason of the timeout>`');
                        return;
                    }
                }
            }
        }
    }
});



// TiWill
bot.on('message', function (message) {
    if(message.guild) {
        if (message.guild.id === '343049869847429120') {
            var parts = message.content.split(" ");
            if (parts[0] === prefix + 'timeout') {
                var isMod = false;
                message.member.roles.forEach(function(role) {
                    if ((role.id === '343070332850012170') || (role.id === '343069878972055552') || (role.id === '343069451056316417')) {
                        isMod = true;
                    }
                });
                if (isMod) {
                    if (!parts[1] || parts[1].indexOf('@') == -1) {
                        message.react("❌");
                        message.reply('L\'utilisateur n\'as pas été trouvé');
                        return;
                    }
                    var userID = parts[1].replace('!', '').replace('@', '').replace('<', '').replace('>', '');
                    if (parts.slice(2).join(' ').trim()) {
                        message.guild.members.forEach(function(member) {
                            if(member.id === userID) {
                                member.addRole('343075905662353410');
                                message.channel.send({
                                    embed: {
                                        color: '14964897',
                                        author: {
                                            name: message.author.username,
                                            icon_url: message.author.avatarURL
                                        },
                                        title: '🐷GROS COCHON!!',
                                        description: 'Le membre ' + parts[1] + ' à été mute sur ' + message.guild.name,
                                        fields: [{
                                            name: "Raison",
                                            value: parts.slice(2).join(' ')
                                        }],
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: bot.user.avatarURL,
                                            text: bot.user.username,
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        message.react("❌");
                        message.reply('Vous devez précisez la raison de l\'attribution du rôle `'+ prefix + 'timeout <@utilisateur> <raison de l\'attribution du rôle>`');
                        return;
                    }
                }
            }
        }
    }
});
