const Discord = require('discord.js');
const tmi = require('tmi.js');
const auth = require('./auth.json');
const config = require('./config.json');
const serversCommands = require('./Servers/index.js');
const botSettings = require('./Modules/settings.js');
const twitchInit = require('./twitch_init.js');
const twitch = require('./Modules/twitch_commands.js');
const { Client } = require('pg');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

var waitingForReaction = [];

const TwitchClient = new tmi.client(twitchInit.options);
const talkedRecently = new Set();

var lastError = null;


const dbConnection = new Client({
    connectionString: config.db_url,
    ssl: true,
});

console.log('Connection to database');
dbConnection.connect();


console.log('Creating Discord Client');
const bot = new Discord.Client({
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
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}

dbConnection.query('SELECT * FROM public.bot_lists;', function (error, result) {
    if (error) throw error;
    for (let row of result.rows) {
        if (row.isDev === config.development) {
            bot.login(row.OauthToken);
        }
    }
});

bot.on('ready', function () {
    console.log("Bot Launched...");
    var username = bot.user.username;
    bot.user.setAvatar('img/avatar/' + username + '\'s avatar.png');
    updateByTime();
    reactionRoles();

    dbConnection.query('SELECT * FROM public.bot_lists WHERE "BotID"=\'' + bot.user.id + '\';', function (error, result) {
        if (error) {
            reportError(error, '500', 'An error occured when I logged on Discord and checked the bot lists table in the database. (./app.js)');
        }
        var isDev = result.rows[0].isDev;
        bot.user.setStatus(!!result.rows[0].isDev ? 'dnd' : 'Online');
        bot.user.setActivity(bot.user.username + ' is back online.');
        if (!isDev) {
            TwitchClient.on('connected', function () {
                console.log('Connected to Twitch');
                twitch.twitchCommands(bot, TwitchClient, dbConnection, reportError);
            });
            TwitchClient.connect();
        }

    });
})

function reportError(error, errorCode = null, errorDescription = null, host = null) {
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
    if (!!message.guild) {
        var embedColor = {
            success: '4437377',
            warning: '16766720',
            error: '16711680',
            twitch: '6570404'
        }
        message.guild.members.forEach(function(member) {
            if (member.id === bot.user.id) {
                embedColor = {
                    success: member.displayColor,
                    warning: '16766720',
                    error: '16711680',
                    twitch: '6570404'
                }
            }
        });
        //botSettings.commands(bot, message, embedColor);
        serversCommands.serversCommands(dbConnection, bot, config, message, embedColor, reportError);

        if (!config.development && !talkedRecently.has(message.author.id)) {
            givePointsToUser(message, embedColor);
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, 60000);
        }
    }
})

function reactionRoles() {
    dbConnection.query('SELECT * From public.reactions_roles;', function (error, result) {
        if (error) {
            reportError(error, '500', 'An error occured when I tryied to check the reactions role table in the database. (./app.js)');
        }
        result.rows.forEach(function (reactionRole) {
            bot.guilds.find(guild => guild.id === reactionRole.ServerID).channels.find(channel => channel.id === reactionRole.ChannelID).fetchMessage(reactionRole.MessageID)
            .then(function (message) {
                if (reactionRole.Emoji && reactionRole.Emoji.indexOf(':') != -1) {
                    var emoji = bot.emojis.find(emoji => emoji.name === reactionRole.Emoji.split(':')[1]);
                    message.react(emoji.id);
                } else if (isEmoji(reactionRole.Emoji)) {
                    message.react(reactionRole.Emoji);
                } else {
                    reportError(error, 400, 'The given emoji isn\'t well formated');
                }
                reactionEventListener(bot, reactionRole)
            })
            .catch(reportError(error));
        });
    });
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
            if (isEmoji(reactionRole.Emoji) && (reaction.emoji.name === reactionRole.Emoji) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole.MessageID)) {
                bot.guilds.find(guild => guild.id === reactionRole.ServerID).members.find(member => member.id === user.id).addRole(reactionRole.RoleID);
            } else if ((':' + reaction.emoji.name + ':' === reactionRole.Emoji) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole.MessageID)) {
                bot.guilds.find(guild => guild.id === reactionRole.ServerID).members.find(member => member.id === user.id).addRole(reactionRole.RoleID);
            }
        });

        bot.on('messageReactionRemove', (reaction, user) => {
            if (isEmoji(reactionRole.Emoji) && (reaction.emoji.name === reactionRole.Emoji) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole.MessageID)) {
                bot.guilds.find(guild => guild.id === reactionRole.ServerID).members.find(member => member.id === user.id).removeRole(reactionRole.RoleID);
            } else if ((':' + reaction.emoji.name + ':' === reactionRole.Emoji) && (user.id !== bot.user.id) && (reaction.message.id == reactionRole.MessageID)) {
                bot.guilds.find(guild => guild.id === reactionRole.ServerID).members.find(member => member.id === user.id).removeRole(reactionRole.RoleID);
            }
        })
        waitingForReaction.push(reactionRole.ID);
    }
}

function updateByTime() {
    var updateInterval = (5 * 60 * 1000);
    setInterval(function () {
        dbConnection.query('SELECT * FROM public.bot_lists WHERE "BotID"=\'' + bot.user.id + '\';', function (error, result) {
            if (error) {
                reportError(error, '500', 'An error occured when I tryied to check the bot lists table in the database to update my activity. (./app.js)');
            }
            var defaultPrefix = result.rows[0].DefaultPrefix;
            bot.user.setStatus(!!result.rows[0].isDev ? 'dnd' : 'Online');
            dbConnection.query('SELECT * FROM public.bot_activity;', function (error, result) {
                if (error) {
                    reportError(error, '500', 'An error occured when I tryied to check the activity list table in the database to update my activity. (./app.js)');
                }
                var totalMembers = 0;
                var activityLists = [];
                result.rows.forEach(function(activity, key){
                    activityLists.push(activity.Activity)
                });
                activityLists.push('help | ' + bot.guilds.array().length + ' servers');
                bot.guilds.forEach(function(guild) {
                    totalMembers += guild.memberCount;
                });
                activityLists.push('help | ' + totalMembers + ' users');
                var botActivity = defaultPrefix + activityLists[Math.floor(Math.random() * activityLists.length)]

                bot.user.setActivity(botActivity);

                defaultPrefix = null;
                totalMember = null;
                botActivity = null;
            });
        })
        reactionRoles();
    }, updateInterval)
    updateInterval = null;
}

function givePointsToUser(message, embedColor) {
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
}
