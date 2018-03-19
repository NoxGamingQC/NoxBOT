//⭐MultiGaming⭐
const rules = require('./Modules/rules.js');

exports.commands = function (bot, config, message) {
    rules.commands(bot, config, message);
}
