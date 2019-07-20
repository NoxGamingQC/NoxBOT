const auth = require('../../auth.json');

exports.commands = function (dbConnection, bot, serverConfig, message, prefix , embedColor, isDev, reportError) {
    dbConnection.query('SELECT * FROM public.modules_lists', function (error, result, fields) {
        if (error) {
            reportError(error, '500', 'An error occured when I tryied to check the modules lists table in the database. (./Servers/CustomServers/index.js)');
        }
        result.rows.forEach(function(botModule) {
            var currentModule = require('../../Modules/' + botModule.Slug + '.js');
            if (isDev && currentModule['commands']) {
                if (isDev) {
                    currentModule.commands(dbConnection, bot, serverConfig, message, prefix, embedColor, reportError);
                }
            } else if (!isDev && currentModule['commands'] && !botModule.Maintenance) {
                serverConfig[botModule.Slug] ? currentModule.commands(dbConnection, bot, serverConfig, message, prefix , embedColor, reportError) : '';
            }
        });
    });
}

exports.modules = function(bot, config) {
    /*welcome.modules(bot, config, '372594099322224641');*/
}
