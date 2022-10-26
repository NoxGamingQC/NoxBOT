var inviteModule = require("./Basic/utilities/invite.js");
var helpModule = require("./Basic/help/help.js");
var pokemon = require("./Basic/pokemon/index.js");

exports.commands = function(message) {
    inviteModule.command(message);
    helpModule.command(message);
    pokemon.module(message);

    if(message == process.env.PREFIX + "ping") {
        message.channel.send("pong");
    }
};