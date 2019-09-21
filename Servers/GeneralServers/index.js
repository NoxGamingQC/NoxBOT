const auth = require('../../auth.json');

exports.commands = function (message, prefix) {
    dbConnection.query('SELECT * FROM public.modules_lists', function (error, result, fields) {
        if (error) {
            reportError(error, '500', 'An error occured when I tryied to check the modules lists table in the database. (./Servers/CustomServers/index.js)');
        }
        result.rows.forEach(function(botModule) {
            var currentModule = require('../../Modules/' + botModule.Slug + '.js');
            if (isDev && currentModule['commands']) {
                if (isDev) {
                    currentModule.commands(message, prefix);
                }
            } else if (!isDev && currentModule['commands'] && !botModule.Maintenance) {
                currentModule.commands(message, prefix);
            }
        });
    });
}

exports.modules = function(bot, config) {
    /*welcome.modules(bot, config, '372594099322224641');*/
}
