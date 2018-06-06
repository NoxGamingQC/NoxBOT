// Suicide.Squadd
//const commands = require('./Modules/commands.js');
const serverinfo = require('../../Modules/serverinfo.js');
const welcome = require('../../Modules/welcome.js');

exports.commands = function (bot, config, message) {
    //commands.commands(bot, config, message);
    serverinfo.commands(bot, config, message);
}

exports.modules = function (bot, config) {
    welcome.modules(bot, config, '443133584606232579');
}
