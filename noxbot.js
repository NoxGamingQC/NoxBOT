const Discord = require('discord.js');
const tmi = require('tmi.js');
const auth = require('./auth.json');
global.config = require('./config.json');
const serversCommands = require('./Servers/index.js');
const botSettings = require('./Modules/Bot/settings.js');
global.twitchInit = require('./twitch_init.js');
const twitch = require('./Modules/Twitch/twitch_commands.js');
global.baseMethods = require('./BaseMethods.js');
global.embed = require('./embed.js');
const { Client } = require('pg');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
global.$ = jQuery = require('jquery')(window);

var waitingForReaction = [];

global.authorName = 'NoxGamingQC#0001';
global.website = 'https://rebrand.ly/noxgamingqc';
global.discordServerLink = 'https://discord.gg/6DGc24x';
global.server = {};
global.discordToken = (config.development ? auth.dev_token : auth.prod_token);

global.TwitchClient = new tmi.client(twitchInit.options);
const talkedRecently = new Set();

global.lastError = null;


console.log('Creating Discord Client');
global.bot = new Discord.Client({
    autoReconnect: true,
    max_message_cache: 0
});

process.on('uncaughtException', (error) => {
    reportError(error, 500, 'You have triggered an uncaughtException:')
})

process.on('unhandledRejection', (error) => {
    reportError(error, 500, 'You have triggered an unhandledRejection, you may have forgotten to catch a Promise rejection:')
})

function isEmoji(str) {
    var ranges = [
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])'
    ];
    if(str) {
        if (str.match(ranges.join('|'))) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}

bot.login(discordToken);

bot.on('debug', console.log)

bot.on('ready', function () {
    console.log("Bot Launched...");
    //var username = bot.user.username;
    //bot.user.setAvatar('img/avatar/' + username + '\'s avatar.png');
    updateByTime();
    reactionRoles();

    global.isDev = config.development;
    bot.user.setStatus((isDev ? 'dnd' : 'Online'));
    bot.user.setActivity(bot.user.username + ' is back online.');
    if (!isDev) {
        TwitchClient.on('connected', function () {
            console.log('Connected to Twitch');
            twitch.twitchCommands();
        });
        TwitchClient.connect();
    }
});

global.reportError = function(error, errorCode = null, errorDescription = null, host = null) {
    if (error) {
        console.log(error);
        var errorGuild = bot.guilds.find(guild => guild.id === '605028700182020101')
        if(!errorGuild) {
            return;
        }
        var errChannel = errorGuild.channels.find(channel => channel.id === '605898526362304512'); // #crash_logs in Nox's Server
        if (!errChannel) {
            return;
        }
        if (error.msg) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + error.code,
                    description: 'Error Message: ' + error.msg,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }

            });
        } else if (error.responseText && error.responseJSON) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + error.responseJSON.status + ' - ' + error.responseJSON.error,
                    description: error.responseJSON.message,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }

            });
        } else if (error.message !== null && errorCode === null && errorDescription === null) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: 500',
                    description: 'Error Message: ' + error.message,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        } else if (error.message !== null && errorCode !== null && errorDescription === null) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + errorCode,
                    description: 'Error Message: ' + error.message,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        } else if (error.message !== null && errorCode !== null && errorDescription !== null) {
            var data = [];
            data.push({
                name: 'Error Message',
                value: error.message
            });

            if (error.request && error.request.connection && error.request.connection._host) {
                data.push({
                    name: 'Host',
                    value: error.request.connection._host
                });
            }

            var code = (error.code ? error.code : errorCode)

            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + code,
                    description: errorDescription,
                    timestamp: new Date(),
                    fields: data,
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        } else if (error.message == null && errorCode !== null && errorCode !== null && errorDescription !== null) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + errorCode,
                    description: 'Error Message: ' + errorDescription,
                    timestamp: new Date(),
                    fields: [{
                        name: 'Description',
                        value: errorDescription
                    }],
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        }
        errChannel = null;
    }
}

bot.on('disconnect', function(errMsg, code) {
    console.log('▬▬▬▬▬ Bot Disconnected from Discord with code', code, 'for reason:', errMsg);
    lastError = {
        code: code,
        msg: errMsg,
        date: new Date()
    }
    bot.connect();
});

//serversCommands.serversModules(bot, config);

bot.on('message', function (message) {
    global.embedColor = {
        success: '4437377',
        warning: '16766720',
        error: '16711680',
        twitch: '6570404'
    }
    if (!!message.guild) {
        message.guild.members.forEach(function(member) {
            if (member.id === bot.user.id) {
                embedColor.success = member.displayColor;
            }
        });
        //botSettings.commands(bot, message, embedColor);
        serversCommands.serversCommands(message);

        if (!config.development && !talkedRecently.has(message.author.id)) {
            //givePointsToUser(message, embedColor);
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 60000);
        }
    }
})

function reactionRoles() {
    $.ajax({
        url: "http://noxgamingqc.herokuapp.com/noxbot/data/json/roles_reactions",
        method: "GET",

        error: function (error) {
            reportError(error, '500', 'An error occured when I tryied to check the reactions role table in the database. (./app.js)');
        },
        
        success: function (result) {
            var reactionLists = [];
            result.forEach(function (reactionRole) {
                bot.guilds.find(guild => guild.id === reactionRole.serverID).channels.find(channel => channel.id === reactionRole.channelID).fetchMessage(reactionRole.messageID)
                .then(function (message) {
                    if (reactionRole.emoji && reactionRole.emoji.indexOf(':') != -1) {
                        var emoji = bot.emojis.find(emoji => emoji.name === reactionRole.emoji.split(':')[1]);
                        message.react(emoji.id);
                    } else if (isEmoji(reactionRole.emoji)) {
                        message.react(reactionRole.emoji);
                    } else {
                        reportError("", 400, 'The given emoji isn\'t well formated');
                    }
                    if(!reactionLists.includes(reactionRole.emoji)) {
                        reactionLists[reactionRole.emoji] = reactionRole
                    }
                    reactionEventListener(bot, reactionLists)
                })
                .catch(function (error) {
                    reportError(error);
                });
            });
        }
    })
}

function reactionEventListener(bot, reactionRole) {
    var isWaitingForReaction = false;
    waitingForReaction.forEach(function(element) {
        if (element == reactionRole.ID) {
            isWaitingForReaction = true;
        }
    });
    if (isWaitingForReaction == false) {
        bot.setMaxListeners(0);
        bot.on('messageReactionAdd', (reaction, user) => {
            if(reactionRole[reaction.emoji.name]) {
                if (isEmoji(reactionRole[reaction.emoji.name].emoji) && (reactionRole[reaction.emoji.name]) && (user.id !== bot.user.id) && (reaction.message.id === reactionRole[reaction.emoji.name].messageID)) {
                    
                    bot.guilds.find(guild => guild.id === reactionRole[reaction.emoji.name].serverID).members.find(member => member.id === user.id).addRole(reactionRole[reaction.emoji.name].roleID);
                } else if ((':' + reaction.emoji.name + ':' === reactionRole[reaction.emoji.name].emoji) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole[reaction.emoji.name].messageID)) {
                    bot.guilds.find(guild => guild.id === reactionRole[reaction.emoji.name].ServerID).members.find(member => member.id === user.id).addRole(reactionRole[reaction.emoji.name].roleID);
                }
            }
        });

        bot.on('messageReactionRemove', (reaction, user) => {
            if(reactionRole[reaction.emoji.name]) {
                if (isEmoji(reactionRole[reaction.emoji.name].emoji) && (reactionRole[reaction.emoji.name]) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole[reaction.emoji.name].messageID)) {
                    bot.guilds.find(guild => guild.id === reactionRole[reaction.emoji.name].serverID).members.find(member => member.id === user.id).removeRole(reactionRole[reaction.emoji.name].roleID);
                } else if ((':' + reaction.emoji.name + ':' === reactionRole[reaction.emoji.name].emoji) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole[reaction.emoji.name].messageID)) {
                    bot.guilds.find(guild => guild.id === reactionRole[reaction.emoji.name].serverID).members.find(member => member.id === user.id).removeRole(reactionRole[reaction.emoji.name].roleID);
                }
            }
        })
        waitingForReaction.push(reactionRole.ID);
    }
}

function updateByTime() {
    var updateInterval = (5 * 60 * 1000);
    setInterval(function () {
            var defaultPrefix = (isDev ? config.dev_prefix : config.prod_prefix);
            bot.user.setStatus((isDev ? 'dnd' : 'Online'));
            var totalMembers = 0;
            $.ajax({
                headers: {
                    'Client-ID': bot.user.id,
                    'Authorization': discordToken
                },
                url: 'http://noxgamingqc.herokuapp.com/noxbot/data/json/activities',
                method: 'get',
                success: function(activities) {
                    activities.push('help | ' + bot.guilds.array().length + ' servers');
                    bot.guilds.forEach(function(guild) {
                        totalMembers += guild.memberCount;
                    });
                    activities.push('help | ' + totalMembers + ' users');
                    var botActivity = defaultPrefix + activities[Math.floor(Math.random() * activities.length)]

                    bot.user.setActivity(botActivity);

                    defaultPrefix = null;
                    totalMember = null;
                    botActivity = null;
                },
                error: function(error) {
                    console.log(error);
                }
            });
        reactionRoles();
    }, updateInterval)
    updateInterval = null;
}

/*function givePointsToUser(message, embedColor) {
    dbConnection.query('SELECT * FROM public.discord_users WHERE "ServerID"=\'' + message.guild.id + '\' AND "DiscordID"=\'' + message.author.id + '\'', function (error, result) {
        if (error) {
            reportError(error, '500', 'An error occured when I tryied to check the discord user table in database to give experience points to a user. (./app.js)');
        }
        var newDiscordPoints = Math.floor((Math.random() * 25) + 15);
        if (result.rows[0]) {
            var updatedDiscordPoints = (result.rows[0].Experiences + newDiscordPoints);
            for (var level = 0; level < 100; level++) {
                if (updatedDiscordPoints >= ((5 * Math.pow(currentLevel, 2) + 50) * currentLevel)) {
                    var currentLevel = level;
                }
                if (result.rows[0].Experiences >= ((5 * Math.pow(currentLevel, 2) + 50) * currentLevel)) {
                    var lastLevel = level;
                }
                if(!lastLevel) {
                    lastLevel = 0;
                }
            }
            if (currentLevel > lastLevel) {
                message.channel.send({
                    embed: {
                        color: embedColor.success,
                        author: {
                            name: bot.user.username + ' levels',
                            icon_url: bot.user.avatarURL
                        },
                        thumbnail: {
                            url: message.author.avatarURL
                        },
                        title: message.author.username + ' just leveled up!',
                        description: 'Congratulation, ' + message.author.username + ' you just leveled up to level ' + currentLevel + '!!',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
            }
            if(message.author.id !== bot.user.id) {
                dbConnection.query('UPDATE public.discord_users SET "Experiences" = \'' + updatedDiscordPoints + '\' WHERE "ID"=\'' + result.rows[0].ID + '\'', function(error, result) {
                    if (error) {
                        reportError(error, '500', 'An error occured when I tryied to update user experience points. (./app.js)');
                    }
                });

            }
            updatedDiscordPoints = null;
            level = null;
            currentLevel = null;
            lastLevel = null;
        } else {
            if (message.author.id !== bot.user.id) {
                dbConnection.query('INSERT INTO public.discord_users("DiscordID", "Experiences", "ServerID") VALUES (' + message.author.id + ', ' + newDiscordPoints + ', ' + message.guild.id + ')', function(error, result) {
                    if (error) {
                        reportError(error, '500', 'An error occured when I tryied to create a new user to give them experience points. (./app.js)');
                    }
                });
            }
        }
        newDiscordPoints = null;
    });
}*/
