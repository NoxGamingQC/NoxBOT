
var help = require("./Basic/help/help.js");
var music = require("./Basic/music/index.js");
var pokemon = require("./Basic/pokemon/index.js");
var utility = require("./Basic/utilities/index.js");
var minecraft = require("./Basic/minecraft/index.js");
var link = require("./Basic/link.js");

exports.modules = function(message, prefix) {
    help.command(message, prefix);
    //music.module(message, prefix);
    pokemon.module(message, prefix);
    utility.commands(message, prefix);
    minecraft.module(message, prefix);
    link.command(message, prefix);
};