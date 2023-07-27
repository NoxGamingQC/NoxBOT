var request = require("../../../request.js");

exports.response = function(isShiny, search, message) {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + search;
    request.get(url, "get",getSpecies, message, {
        isShiny: isShiny
    });
}

function getSpecies(result, message, data) {
    getSpeciesURL = result.species.url;
    data.result = result;
    request.get(getSpeciesURL, "get", sendPokemonInfo, message, data)
}

function sendPokemonInfo(species, message, data) {
    message.channel.send({
        embed: {
            color: process.env.SUCCESS_COLOR,
            author: {
                name: bot.user.username + ' - POKéMON',
                icon_url: bot.user.avatarURL
            },
            thumbnail: {
                url: isShiny ? result.sprites.front_shiny : result.sprites.front_default
            },
            title: result.name[0].toUpperCase() + result.name.substring(1),
            description: species.flavor_text_entries[0].flavor_text.replace(/[\n\r]/g, ' '),
            fields: [
                {
                    name: 'id',
                    value: result.id,
                },
                {
                    name: result.types.length > 1 ? 'Types' : 'Type',
                    value: result.types.length > 1 ? result.types[0].type.name + ', ' + result.types[1].type.name :  result.types[0].type.name,
                    inline: true,
                },
                {
                    name: 'Height',
                    value: result.height,
                    inline: true,
                },
                {
                    name: 'Weight',
                    value: result.weight,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: message.author.username
            }
        }
    });
}