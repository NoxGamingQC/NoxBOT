var help = require("./help/help.js");
var linkAccount = require("./linkAccount.js");
var minecraftSkins = require("./skins.js");
var getPokemonInformation = require("./pokemon/getPokemon.js");
var invite = require("./utilities/invite.js");
var ping = require("./utilities/ping.js");
var user = require("./utilities/user.js");
var server = require("./utilities/server.js");

exports.loadCommands = function(message, prefix) {
    getHelpCommands(message, prefix);
    getLinkAccountCommands(message, prefix);
    getMinecraftCommands(message, prefix);
    getPokemonCommands(message, prefix);
    getUtilityCommands(message, prefix);
};

function getHelpCommands(message, prefix) {
    help.command(message, prefix);
}

function getLinkAccountCommands(message, prefix) {
    linkAccount.command(message, prefix);
}

function getMinecraftCommands(message, prefix) {
    minecraftSkins.command(message, prefix);
}

function getPokemonCommands(message, prefix) {
    getPokemonInformation.command(message, prefix)
}

function getUtilityCommands(message, prefix) {
    invite.command(message, prefix);
    ping.command(message, prefix);
    user.command(message, prefix);
    server.command(message, prefix);
}