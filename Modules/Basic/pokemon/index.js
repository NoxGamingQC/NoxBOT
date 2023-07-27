var getPokemon = require("./getPokemon.js");

exports.module = function(message) {
    if (message.content.includes(process.env.PREFIX + 'pokemon')) {
        var search = message.content.split(process.env.PREFIX + 'pokemon ', 2)[1];
        getPokemon.response(isShiny = false, search, message);
    } else if(message.content.includes(process.env.PREFIX + 'shiny')) {
        var search = message.content.split(process.env.PREFIX + 'shiny ', 2)[1];
        getPokemon.response(isShiny = true, search, message);
    }
};