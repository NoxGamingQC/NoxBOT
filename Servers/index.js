const noxracingcircle = require('./282902357862514688/index.js');
const multigaming = require('./343049869847429120/index.js');
const suicidesquadd = require('./443133584606232576/index.js');
const generalServers = require('./GeneralServers/index.js');

const specialServer = {
    '282902357862514688': noxracingcircle, //Nox's Racing Circle,
    '343049869847429120': multigaming, //⭐MultiGaming⭐
    '443133584606232576': suicidesquadd //Suicide.Squadd
};

exports.serversCommands = function(bot, config, message) {
    if(message.guild) {
        if (specialServer[message.guild.id]) {
            specialServer[message.guild.id].commands(bot, config, message);
        } else {
            generalServers.commands(bot, config, message);
        }
    }
}

exports.serversModules = function(bot, config) {
    Object.values(specialServer).forEach(function(value) {
        value.modules(bot, config);
    });
}
