const avatar = require('../../Modules/avatar.js');
//const commands = require('./Modules/commands.js');
const help = require('../../Modules/help.js');
const info = require('../../Modules/info.js');
const invite = require('./Modules/invite.js');
const lmgtfy = require('../../Modules/lmgtfy.js');
const misc = require('../../Modules/miscs.js');
const ping = require('../../Modules/ping.js');
//const roles = require('../../Modules/roles.js');
const serverinfo = require('../../Modules/server_info.js');
const userinfo = require('../../Modules/user_info.js');

exports.commands = function (message, prefix) {
    avatar.commands(message, prefix);
    //commands.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    help.commands(message, prefix);
    info.commands(message, prefix);
    invite.commands(message, prefix);
    lmgtfy.commands(message, prefix);
    misc.commands(message, prefix);
    ping.commands(message, prefix);
    //roles.commands(bot, config, message, prefix, embedColor, reportError);
    serverinfo.commands(message, prefix);
    userinfo.commands(message, prefix);
}
