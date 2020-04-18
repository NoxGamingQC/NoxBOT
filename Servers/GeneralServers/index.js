const auth = require('../../auth.json');

exports.commands = function (message, prefix) {
    $.ajax({
        url: 'http://noxgamingqc.herokuapp.com/noxbot/data/json/subs_modules',
        method: 'get',
        success: function(subsModules) {
            subsModules.forEach(function (subModule) {
                var currentModule = require('../../Modules/' + subModule.module_slug + '/' + subModule.slug + '.js');
                if (isDev && currentModule['commands']) {
                    if (isDev) {
                        currentModule.commands(message, prefix);
                    }
                } else if (!isDev && currentModule['commands'] && !subModule.isInMaintenance) {
                    currentModule.commands(message, prefix);
                }
            });
        },
        error: function(error) {
            reportError.reportError(error, '500', 'An error occured when I tryied to check the modules lists table in the database.');
            console.log(error);
        }
    });
}

exports.modules = function(bot, config) {
    /*welcome.modules(bot, config, '372594099322224641');*/
}
