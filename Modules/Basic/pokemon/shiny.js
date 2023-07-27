var getPokemon = require("./getPokemon.js");

exports.command = function(message) {
    if (message.content.includes(process.env.PREFIX + 'pokemon')) {
        var search = message.content.split(process.env.PREFIX + 'pokemon ', 2)[1];
        getPokemon.response(isShiny = true, search);
    }
};