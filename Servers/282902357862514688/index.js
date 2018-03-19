//Nox's Racing Circle
const commands = require('./Modules/commands.js');
const links = require('./Modules/links.js');
const welcome = require('./Modules/welcome.js');
const invite = require('./Modules/invite.js');
const ping = require('../../Modules/ping.js');

exports.commands = function (bot, config, message) {
    commands.commands(bot, config, message);
    links.commands(bot, config, message);
    ping.commands(bot, config, message);
    invite.commands(bot, config, message);
}

exports.modules = function(bot, config) {
    welcome.module(bot, config);
}
