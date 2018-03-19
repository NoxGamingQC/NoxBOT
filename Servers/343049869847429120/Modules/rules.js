exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'reglements') {
        message.channel.send({
            embed: {
                color: '4961603',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: '⭐MultiGaming⭐',
                description: 'Règlements MultiGaming',
                fields: [{
                    name: "Règle #1",
                    value: 'Le spam est strictement INTERDIT.'
                },
                {
                    name: "Règle #2",
                    value: 'Crier, faire du bruit ou tout autre son désagréable dans un salon vocal sera punissable par l\'attribution du grade " 🐷GROS COCHON!! " pour une durée de 24 heures.'
                },
                {
                    name: "Règle #3",
                    value: 'Les menaces, les insultes et tout autre acte de violence et de méchanceté sera punissable par votre exclusion temporaire du serveur. Si ces actes sont répétés après la ré-inclusion au serveur, vous serez banni à vie.'
                },
                {
                    name: "Règle #4",
                    value: 'La publicité d\'autres serveurs et les liens vers ceux-ci ne seront pas tolérés. Si répété, le grade " 🐷GROS COCHON!! " vous sera attribué pour une durée de 24 heures.'
                },
                {
                    name: "Règle #5",
                    value: 'Tout propos raciste, sexiste et/ou des propos dégradants envers une religion (de façon excessive) aura pour sanction d\'avoir le titre de " 🐷GROS COCHON!! " pour une durée de 24h. Si l\'action est répété, le joueur sera expulsé.'
                },
                {
                    name: "Règle #6",
                    value: 'Amusez-vous bien! 😃'
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: 'Titre de " 🐷GROS COCHON!! " = " mute " pendant 24h'
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
