var getPokemon = require("./getPokemon.js");

exports.module = function(message, prefix) {
    if (message.content.includes(prefix + 'pokemon')) {
        var search = message.content.split(prefix + 'pokemon ', 2)[1];
        getPokemon.response(isShiny = false, search, message);
    } else if(message.content.includes(prefix + 'shiny')) {
        var search = message.content.split(prefix + 'shiny ', 2)[1];
        getPokemon.response(isShiny = true, search, message);
    }
};