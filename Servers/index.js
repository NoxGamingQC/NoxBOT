const customServer = require('./CustomServers/index.js');
const generalServers = require('./GeneralServers/index.js');
const twitchInit = require('../twitch_init.js');
const twitchUserInfo = require('../Modules/Twitch/twitch_user_info.js');

exports.serversCommands = function (message) {
    if (message.guild) {
        var isServerInDB = false;
        var defaultPrefix = (isDev ? config.dev_prefix : config.prod_prefix);
        /*dbConnection.query('SELECT * FROM public.servers_config', function (error, result, fields) {
            if (error) {
                reportError(error, '500', 'An error occured when I tryied to check the servers configuration table in the database. (./Servers/index.js)');
            }
            result.rows.forEach(function(serverConfig) {
                var prefix = isDev ? defaultPrefix : serverConfig.Prefix;
                if(serverConfig.ServerID === message.guild.id) {
                    customServer.commands(message, prefix, serverConfig);
                    twitchUserInfo.commands(message, prefix, serverConfig);
                    isServerInDB = true;
                }
            });*/
            if(!isServerInDB) {
                generalServers.commands(message, defaultPrefix);
                twitchUserInfo.commands(message, defaultPrefix);
            }
        //});
    }
}

/*exports.serversModules = function(bot, config) {
    Object.values(specialServer).forEach(function(value) {
        value.modules(bot, config);
    });
}*/
