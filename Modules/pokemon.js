var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);


exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];
    var pokemonTypeColor = {
        normal: '11053176',
        fire: '15761456',
        fighting: '12595240',
        water: '6852848',
        flying: '11047152',
        grass: '7915600',
        poison: '10502304',
        electric: '16306224',
        ground: '14729320',
        psychic: '16275592',
        rock: '12099640',
        ice: '10016984',
        bug: '11057184',
        dragon: '7354616',
        ghost: '7362712',
        dark: '7362632',
        steel: '12105936',
        fairy: '15636908',
        '???': '6856848',
    };

    var pokemonName = parts[1];
    if (commandName === prefix + 'pokemon') {
        if(parts[2] && parts[2].toLowerCase() === 'shiny') {
            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase(),
                success: function (result) {
                    var pokemonDescription = '';
                    $.ajax({
                        url: 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonName.toLowerCase(),
                        async: 0,
                        success: function (pokemonSpeciesResult) {
                            pokemonSpeciesResult.flavor_text_entries.forEach(function (flavor_text_entry) {
                                if (flavor_text_entry.language.name === 'en') {
                                    pokemonDescription = flavor_text_entry.flavor_text
                                }
                            })
                        }
                    })

                    var pokemonAbilities = [];
                    var pokemonMoves = [];

                    result.abilities.slice(-5).forEach(function (value) {
                        pokemonAbilities.push(value.ability.name.charAt(0).toUpperCase() + value.ability.name.slice(1));
                    });
                    result.moves.slice(0, 5).forEach(function (value) {
                        pokemonMoves.push(value.move.name.charAt(0).toUpperCase() + value.move.name.slice(1));
                    });
                    message.channel.send({
                        embed: {
                            color: pokemonTypeColor[$(result.types).toArray()[0].type.name.toLowerCase()],
                            author: {
                                name: bot.user.username + ' - Pokémon Shiny Version - ' + result.name.toUpperCase(),
                                icon_url: bot.user.avatarURL
                            },
                            thumbnail: {
                                url: result.sprites.front_shiny
                            },
                            title: result.name.toUpperCase(),
                            description: pokemonDescription,
                            fields: [
                                {
                                    name: 'Pokédex Entry',
                                    value: result.id,
                                    inline: true
                                },
                                {
                                    name: 'Type',
                                    value: $(result.types).toArray()[1] ? $(result.types).toArray()[0].type.name.toUpperCase() + ' & ' + $(result.types).toArray()[1].type.name.toUpperCase() : $(result.types).toArray()[0].type.name.toUpperCase(),
                                    inline: true
                                },
                                {
                                    name: 'Height',
                                    value: parseInt((result.height * 10) * 0.032808) + 'ft ' + Math.round(((result.height * 10) * 0.032808 - parseInt((result.height * 10) * 0.032808)) * 12) + 'in (' + result.height * 10 + 'cm)',
                                    inline: true
                                },
                                {
                                    name: 'Weight',
                                    value: parseInt((result.weight / 10) * 2.2046) + 'lb (' + result.weight / 10 + 'kg)',
                                    inline: true
                                },
                                {
                                    name: 'Abilities [' + result.abilities.length + ']',
                                    value: pokemonAbilities.join(', '),
                                    inline: true
                                },
                                {
                                    name: 'Stats',
                                    value: result.stats[5].stat.name.toUpperCase() + ' [' + result.stats[5].base_stat + '], ' + result.stats[4].stat.name.toUpperCase() + ' [' + result.stats[4].base_stat + '], ' + result.stats[3].stat.name.toUpperCase() + ' [' + result.stats[3].base_stat + '], ' + result.stats[2].stat.name.toUpperCase() + ' [' + result.stats[2].base_stat + '], ' + result.stats[1].stat.name.toUpperCase() + ' [' + result.stats[1].base_stat + '], ' + result.stats[0].stat.name.toUpperCase() + ' [' + result.stats[0].base_stat + ']',
                                    inline: true
                                },
                                {
                                    name: 'Moves [' + result.moves.length + ']',
                                    value: pokemonMoves.join(', '),
                                    inline: true
                                },

                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                    if (message && message.deletable) {
                        message.delete();
                    }
                },
                error: function (error) {
                    if (error.status == 404) {
                        message.channel.send({
                            embed: {
                                color: embedColor.error,
                                author: {
                                    name: bot.user.username + ' - Pokémon',
                                    icon_url: bot.user.avatarURL
                                },
                                title: 'Error 404 - Pokémon Not Found',
                                description: 'Check out your syntax. You might have done a mistakes by typing it (You can also search your Pokémon by it\'s Pokédex Entry Number)',
                                timestamp: new Date(),
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: message.author.tag
                                }
                            }
                        });
                    }
                }
            });
        }
        else {
            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/'+ pokemonName.toLowerCase(),
                success: function (result) {
                    var pokemonDescription = '';
                    $.ajax({
                        url: 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonName.toLowerCase(),
                        async: 0,
                        success: function (pokemonSpeciesResult) {
                            pokemonSpeciesResult.flavor_text_entries.forEach(function (flavor_text_entry) {
                                if (flavor_text_entry.language.name === 'en') {
                                    pokemonDescription = flavor_text_entry.flavor_text
                                }
                            })
                        }
                    })
                    var pokemonAbilities = [];
                    var pokemonMoves = [];

                    result.abilities.slice(-5).forEach(function (value) {
                        pokemonAbilities.push(value.ability.name.charAt(0).toUpperCase() + value.ability.name.slice(1));
                    });
                    result.moves.slice(0, 5).forEach(function (value) {
                        pokemonMoves.push(value.move.name.charAt(0).toUpperCase() + value.move.name.slice(1));
                    });
                    message.channel.send({
                        embed: {
                            color: pokemonTypeColor[$(result.types).toArray()[0].type.name.toLowerCase()],
                            author: {
                                name: bot.user.username + ' - Pokémon - ' + result.name.toUpperCase(),
                                icon_url: bot.user.avatarURL
                            },
                            thumbnail: {
                                url: result.sprites.front_default
                            },
                            title: result.name.toUpperCase(),
                            description: pokemonDescription,
                            fields: [
                                {
                                    name: 'Pokédex Entry',
                                    value: result.id,
                                    inline: true
                                },
                                {
                                    name: 'Type',
                                    value: $(result.types).toArray()[1] ? $(result.types).toArray()[0].type.name.toUpperCase() + ' & ' + $(result.types).toArray()[1].type.name.toUpperCase() : $(result.types).toArray()[0].type.name.toUpperCase(),
                                    inline: true
                                },
                                {
                                    name: 'Height',
                                    value: parseInt((result.height * 10) * 0.032808) + 'ft ' + Math.round(((result.height * 10) * 0.032808 - parseInt((result.height * 10) * 0.032808)) * 12) + 'in (' + result.height * 10 + 'cm)',
                                    inline: true
                                },
                                {
                                    name: 'Weight',
                                    value: parseInt((result.weight / 10) * 2.2046) + 'lb (' + result.weight / 10 + 'kg)',
                                    inline: true
                                },
                                {
                                    name: 'Abilities [' + result.abilities.length + ']',
                                    value: pokemonAbilities.join(', '),
                                    inline: true
                                },
                                {
                                    name: 'Stats',
                                    value: result.stats[5].stat.name.toUpperCase() + ' [' + result.stats[5].base_stat + '], ' + result.stats[4].stat.name.toUpperCase() + ' [' + result.stats[4].base_stat + '], ' + result.stats[3].stat.name.toUpperCase() + ' [' + result.stats[3].base_stat + '], ' + result.stats[2].stat.name.toUpperCase() + ' [' + result.stats[2].base_stat + '], ' + result.stats[1].stat.name.toUpperCase() + ' [' + result.stats[1].base_stat + '], ' + result.stats[0].stat.name.toUpperCase() + ' [' + result.stats[0].base_stat + ']',
                                    inline: true
                                },
                                {
                                    name: 'Moves [' + result.moves.length + ']',
                                    value: pokemonMoves.join(', '),
                                    inline: true
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                    if (message && message.deletable) {
                        message.delete();
                    }
                },
                error: function(error) {
                    if(error.status == 404) {
                        message.channel.send({
                            embed: {
                                color: embedColor.error,
                                author: {
                                    name: bot.user.username + ' - Pokémon',
                                    icon_url: bot.user.avatarURL
                                },
                                title: 'Error 404 - Pokémon Not Found',
                                description: 'Check out your syntax. You might have done a mistakes by typing it (You can also search your Pokémon by it\'s Pokédex Entry Number)',
                                timestamp: new Date(),
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: message.author.tag
                                }
                            }
                        });
                    }
                }
            });
        }
    }
}
