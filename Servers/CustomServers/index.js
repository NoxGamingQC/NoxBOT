const auth = require('../../auth.json');

exports.commands = function (message, prefix, serverConfig) {
    $.ajax({
        url: 'http://noxgamingqc.herokuapp.com/noxbot/data/json/subs_modules',
        method: 'get',
        success: function(subsModules) {
            subsModules.forEach(function (subModule) {
                var currentModule = require('../../Modules/' + subModule.module_slug + '/' + subModule.slug + '.js');
                if (isDev && currentModule['commands']) {
                    if (isDev) {
                        currentModule.commands(message, prefix, serverConfig);
                    }
                } else if (!isDev && currentModule['commands'] && !subModule.isInMaintenance) {
                    serverConfig[subModule.slug] ? currentModule.commands(message, prefix, serverConfig) : '';
                }
            });
        },
        error: function(error) {
            reportError(error, '500', 'An error occured when I tryied to check the modules lists table in the database.');
            console.log(error);
        }
    });
}

exports.modules = function(bot, config) {
    /*welcome.modules(bot, config, '372594099322224641');*/
}
