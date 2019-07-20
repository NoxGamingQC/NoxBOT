exports.commands = function (client, room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    //8-ball command to add

    if ((message.toLowerCase()).includes("!drop")) {
        client.says(room, chatter['display-name'] + ' was placed #' + parseInt((Math.random() * 100) + 1) + ' after fighting in the arena')
    }
    if ((message.toLowerCase()).includes("!equipement")) {
        client.action(room, 'NoxGamingQC equipment can be found here: http://rebrand.ly/noxgamingqc')
    }

    if ((message.toLowerCase()).split(' ')[0].includes("!hug") && message.toLowerCase().split(' ')[1]) {
        client.action(room, chatter['display-name'] + ' hugged ' + part[1])
    }
    if ((message.toLowerCase()).includes("!hugme")) {
        client.action(room, 'hugs ' + chatter['display-name'])
    }
    if ((message.toLowerCase()).includes("!lenny")) {
        client.say(room, '( ͡° ͜ʖ ͡°)')
    }
    if ((message.toLowerCase()).includes("!lurk")) {
        client.action(room, chatter['display-name'] + ' is now lurking! Enjoy your lurk ' + chatter['display-name'] + ' <3')
    }
    if ((message.toLowerCase()).includes("!unlurk")) {
        client.action(room, chatter['display-name'] + ' stopped lurking! Enjoy the show ' + chatter['display-name'] + ' <3')
    }
    if ((message.toLowerCase()).includes("!nox")) {
        client.action(room, '" I’m a guy! I’m a guys! Oh fuck that shit I’m a Nox" – NoxRacing, 2017-12-17')
    }
    if ((message.toLowerCase()).includes("!run")) {
        client.action(room, chatter['display-name'] + ' ran ' + parseInt((Math.random() * 10000) + 1) + ' meters')
    }
    if ((message.toLowerCase()).includes("!shrug")) {
        client.say(room, ' ¯\_(ツ)_/¯')
    }
    if ((message.toLowerCase()).includes("!tableflip")) {
        client.say(room, '(╯°□°）╯︵ ┻━┻')
    }
    if ((message.toLowerCase()).includes("!unflip")) {
        client.say(room, '┬─┬ ノ( ゜-゜ノ)')
    }
}
