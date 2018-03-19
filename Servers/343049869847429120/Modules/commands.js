exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'commands') {
        message.author.send({
            embed: {
                color: '4961603',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Commandes de ' + bot.user.username,
                description: message.author + ', voici une liste des commandes que vous pouvez utilisez!',
                fields: [{
                    name: "🌎 Commandes générales",
                    value: prefix + 'commands: Obtenir les commandes de ' + bot.user.username + '\nreglement: Obtenir une liste des règlements du serveur'
                },
                {
                    name: "​🔐 Commandes de rôles",
                    value: prefix + 'rank list: Liste de tout les rôles joignables\n' + prefix + 'rank join <role>: Vous attribut le rôle désiré\n' + prefix + 'rank leave <role>: Vous enlève le rôle désiré'
                },
                {
                    name: "⚔️ Commandes de modérations",
                    value: prefix + 'timeout <@utilisateur> <raison>: Mute l\'utilisateur mentionné pour une durée indéterminé, le modérateur dois préciser la raison du timeout'
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: bot.user.username + ' commands',
                description: message.author + ', une liste des commandes vous a été envoyée dans vos messages privés! :wink:',
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© Copyright 2018 - NoxRacing"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
