
var help = require("./Basic/help/help.js");
var music = require("./Basic/music/index.js");
var pokemon = require("./Basic/pokemon/index.js");
var utility = require("./Basic/utilities/index.js");
var minecraft = require("./Basic/minecraft/index.js");

exports.modules = function(message) {
    help.command(message);
    //music.module(message);
    pokemon.module(message);
    utility.commands(message);
    minecraft.module(message);
    link.command(message);
};