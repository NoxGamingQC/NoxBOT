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

exports.commands = function (dbConnection, bot, config, message, prefix, embedColor, reportError) {
    avatar.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    //commands.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    help.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    info.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    invite.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    lmgtfy.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    misc.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    ping.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    //roles.commands(bot, config, message, prefix, embedColor, reportError);
    serverinfo.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
    userinfo.commands(dbConnection, bot, config, message, prefix, embedColor, reportError);
}
