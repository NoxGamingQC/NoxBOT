//Nox's Racing Circle
const avatar = require('../../Modules/avatar.js');
const colors = require('../../Modules/color.js');
const commands = require('./Modules/commands.js');
const invite = require('./Modules/invite.js');
const links = require('./Modules/links.js');
const lmgtfy = require('../../Modules/lmgtfy.js');
const misc = require('../../Modules/misc.js');
const ping = require('../../Modules/ping.js');
const roles = require('../../Modules/roles.js');
const timeout = require('./Modules/timeout.js');
const warframe = require('../../Modules/warframe.js');
const welcome = require('./Modules/welcome.js');


exports.commands = function (bot, config, message) {
    avatar.commands(bot, config, message);
    colors.commands(bot, config, message);
    commands.commands(bot, config, message);
    invite.commands(bot, config, message);
    links.commands(bot, config, message);
    lmgtfy.commands(bot, config, message);
    misc.commands(bot, config, message);
    ping.commands(bot, config, message);
    roles.commands(bot, config, message);
    timeout.commands(bot, config, message);
    warframe.commands(bot, config, message);
    welcome.commands(bot, config, message);
}

exports.modules = function(bot, config) {
    welcome.modules(bot, config);
}
