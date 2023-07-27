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
                url: data.isShiny ? data.result.sprites.front_shiny : data.result.sprites.front_default
            },
            title: data.result.name[0].toUpperCase() + data.result.name.substring(1),
            description: species.flavor_text_entries[0].flavor_text.replace(/[\n\r]/g, ' '),
            fields: [
                {
                    name: 'id',
                    value: data.result.id,
                },
                {
                    name: data.result.types.length > 1 ? 'Types' : 'Type',
                    value: data.result.types.length > 1 ? data.result.types[0].type.name + ', ' + data.result.types[1].type.name :  data.result.types[0].type.name,
                    inline: true,
                },
                {
                    name: 'Height',
                    value: data.result.height,
                    inline: true,
                },
                {
                    name: 'Weight',
                    value: data.result.weight,
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