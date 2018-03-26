const avatar = require('../../Modules/avatar.js');
const colors = require('../../Modules/color.js');
const commands = require('./Modules/commands.js');
const lmgtfy = require('../../Modules/lmgtfy.js');
const misc = require('../../Modules/misc.js');
const ping = require('../../Modules/ping.js');
const roles = require('../../Modules/roles.js');
const serverinfo = require('../../Modules/serverinfo.js');


exports.commands = function (bot, config, message) {
    avatar.commands(bot, config, message);
    colors.commands(bot, config, message);
    commands.commands(bot, config, message);
    lmgtfy.commands(bot, config, message);
    misc.commands(bot, config, message);
    ping.commands(bot, config, message);
    roles.commands(bot, config, message);
    serverinfo.commands(bot, config, message);
}
