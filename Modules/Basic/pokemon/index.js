var pokemon = require("./pokemon.js");
var shiny = require("./shiny.js");


exports.module = function(message) {
    pokemon.command(message);
    shiny.command(message);
};