/*
https://api.warframestat.us/pc
https://api.warframestat.us/ps4
https://api.warframestat.us/xb1
*/

exports.commands = function (message, prefix) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0]/*.toLowerCase()*/ + ' ' + parts[1]/*.toLowerCase()*/;

    if (commandName === prefix + 'warframe info') {
        var warframeName = parts[2] + (parts[3] ? (' ' + parts[3]) : '');
        $.ajax({
            url: 'https://api.warframestat.us/warframes/' + warframeName,
            success: function (result) {
                message.channel.send({
                    embed: {
                        color: result.color,
                        author: {
                            name: bot.user.username + ' - Warframe info - ' + result.name,
                            icon_url: bot.user.avatarURL
                        },
                        thumbnail: {
                            url: result.wikiaThumbnail
                        },
                        title: result.name,
                        description: result.description,
                        fields: [
                            {
                                name: 'Health',
                                value: result.health,
                                inline: true
                            },
                            {
                                name: 'Shield',
                                value: result.shield,
                                inline: true
                            },
                            {
                                name: 'Armor',
                                value: result.armor,
                                inline: true
                            },
                            {
                                name: 'Stamina',
                                value: result.stamina,
                                inline: true
                            },
                            {
                                name: 'Power',
                                value: result.power,
                                inline: true
                            },
                            {
                                name: 'Passive Description',
                                value: result.passiveDescription,
                                inline: false
                            },
                            {
                                name: 'Abillity 1 - ' + result.abilities[0].name,
                                value: result.abilities[0].description,
                                inline: false
                            },
                            {
                                name: 'Abillity 2 - ' + result.abilities[1].name,
                                value: result.abilities[1].description,
                                inline: false
                            },
                            {
                                name: 'Abillity 3 - ' + result.abilities[2].name,
                                value: result.abilities[2].description,
                                inline: false
                            },
                            {
                                name: 'Abillity 4 - ' + result.abilities[3].name,
                                value: result.abilities[3].description,
                                inline: false
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
                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username + ' - Warframe info',
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error - Warframe Info',
                        description: 'Check out your syntax. You might have done a mistakes by typing it',
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
            }
        });
    }
}
