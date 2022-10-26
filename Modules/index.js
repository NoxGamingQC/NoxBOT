
var helpModule = require("./Basic/help/help.js");
var pokemon = require("./Basic/pokemon/index.js");
var utilityModule = require("./Basic/utilities/index.js");

exports.commands = function(message) {
    helpModule.command(message);
    pokemon.module(message);
    utilityModule.module(message);
};