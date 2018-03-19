//⭐MultiGaming⭐
const commands = require('./Modules/commands.js');
const roles = require('../../Modules/roles.js');
const rules = require('./Modules/rules.js');
const timeout = require('./Modules/timeout.js');
//const welcome = require('./Modules/welcome.js');


exports.commands = function (bot, config, message) {
    commands.commands(bot, config, message);
    roles.commands(bot, config, message);
    rules.commands(bot, config, message);
    timeout.commands(bot, config, message);
}

exports.modules = function (bot, config) {
    //welcome.modules(bot, config);
}
