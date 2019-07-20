const customServer = require('./CustomServers/index.js');
const generalServers = require('./GeneralServers/index.js');
const twitchInit = require('../twitch_init.js');
const twitchUserInfo = require('../Modules/twitch_user_info.js');

exports.serversCommands = function (dbConnection, bot, config, message, embedColor, reportError) {
    if (message.guild) {
        var isServerInDB = false;

        dbConnection.query('SELECT * FROM public.bot_lists WHERE "BotID"=\'' + bot.user.id + '\';', function (error, result, fields) {
            if (error) {
                reportError(error, '500', 'An error occured when I tryied to check the bot list table in the database to dispatch servers. (./Servers/index.js)');
            }
            var isDev = result.rows[0].isDev;
            var defaultPrefix = result.rows[0].DefaultPrefix;
            dbConnection.query('SELECT * FROM public.servers_config', function (error, result, fields) {
                if (error) {
                    reportError(error, '500', 'An error occured when I tryied to check the servers configuration table in the database. (./Servers/index.js)');
                }
                result.rows.forEach(function(serverConfig) {
                    if(serverConfig.ServerID === message.guild.id) {
                        var prefix = isDev ? defaultPrefix : serverConfig.Prefix;
                        customServer.commands(dbConnection, bot, serverConfig, message, prefix, embedColor, isDev);
                        twitchUserInfo.commands(bot, config, message, embedColor, twitchInit, serverConfig.Prefix);
                        isServerInDB = true;
                    }
                    if(!isServerInDB) {
                        generalServers.commands(dbConnection, bot, serverConfig, message, defaultPrefix, embedColor, isDev);
                        twitchUserInfo.commands(bot, config, message, embedColor, twitchInit, defaultPrefix);
                    }
                });
            });
        });
    }
}

/*exports.serversModules = function(bot, config) {
    Object.values(specialServer).forEach(function(value) {
        value.modules(bot, config);
    });
}*/
