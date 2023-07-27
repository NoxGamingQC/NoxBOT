var request = require("../../../request.js");

exports.response = function(isShiny, search) {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + search;
    response = request.get(url, "get");
    getSpeciesURL = response.response.species.url;
    speciesResponse = request.get(getSpeciesURL, "get");
            
        message.channel.send({
            embed: {
                color: process.env.SUCCESS_COLOR,
                author: {
                    name: bot.user.username + ' - POKéMON',
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: isShiny ? response.response.sprites.front_shiny : response.sprites.front_default
                },
                title: response.name[0].toUpperCase() + response.name.substring(1),
                description: speciesResponse.flavor_text_entries[0].flavor_text.replace(/[\n\r]/g, ' '),
                fields: [
                    {
                        name: 'id',
                        value: response.id,
                    },
                    {
                        name: response.types.length > 1 ? 'Types' : 'Type',
                        value: response.types.length > 1 ? response.types[0].type.name + ', ' + response.types[1].type.name :  response.types[0].type.name,
                        inline: true,
                    },
                    {
                        name: 'Height',
                        value: response.height,
                        inline: true,
                    },
                    {
                        name: 'Weight',
                        value: response.weight,
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
    })
}