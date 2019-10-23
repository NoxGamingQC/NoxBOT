exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    //8-ball command to add

    if ((message.toLowerCase()).includes("!drop")) {
        TwitchClient.says(room, chatter['display-name'] + ' was placed #' + parseInt((Math.random() * 100) + 1) + ' after fighting in the arena')
    }
    if ((message.toLowerCase()).includes("!equipement")) {
        TwitchClient.action(room, 'NoxGamingQC equipment can be found here: http://rebrand.ly/noxgamingqc')
    }

    if ((message.toLowerCase()).split(' ')[0].includes("!hug") && message.toLowerCase().split(' ')[1]) {
        TwitchClient.action(room, chatter['display-name'] + ' hugged ' + part[1])
    }
    if ((message.toLowerCase()).includes("!hugme")) {
        TwitchClient.action(room, 'hugs ' + chatter['display-name'])
    }
    if ((message.toLowerCase()).includes("!lenny")) {
        TwitchClient.say(room, '( ͡° ͜ʖ ͡°)')
    }
    if ((message.toLowerCase()).includes("!lurk")) {
        TwitchClient.action(room, chatter['display-name'] + ' is now lurking! Enjoy your lurk ' + chatter['display-name'] + ' <3')
    }
    if ((message.toLowerCase()).includes("!unlurk")) {
        TwitchClient.action(room, chatter['display-name'] + ' stopped lurking! Enjoy the show ' + chatter['display-name'] + ' <3')
    }
    if ((message.toLowerCase()).includes("!nox")) {
        TwitchClient.action(room, '" I’m a guy! I’m a guys! Oh fuck that shit I’m a Nox" – NoxRacing, 2017-12-17')
    }
    if ((message.toLowerCase()).includes("!run")) {
        TwitchClient.action(room, chatter['display-name'] + ' ran ' + parseInt((Math.random() * 10000) + 1) + ' meters')
    }
    if ((message.toLowerCase()).includes("!shrug")) {
        TwitchClient.say(room, ' ¯\_(ツ)_/¯')
    }
    if ((message.toLowerCase()).includes("!tableflip")) {
        TwitchClient.say(room, '(╯°□°）╯︵ ┻━┻')
    }
    if ((message.toLowerCase()).includes("!unflip")) {
        TwitchClient.say(room, '┬─┬ ノ( ゜-゜ノ)')
    }
}
