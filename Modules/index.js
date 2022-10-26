var inviteModule = require("./Basic/utilities/invite.js");
var pingModule = require("./Basic/utilities/ping.js");
var helpModule = require("./Basic/help/help.js");
var pokemon = require("./Basic/pokemon/index.js");

exports.commands = function(message) {
    inviteModule.command(message);
    pingModule.command(message);
    helpModule.command(message);
    pokemon.module(message);
};