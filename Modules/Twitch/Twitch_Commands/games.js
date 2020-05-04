exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!blacksquad")) {
        TwitchClient.action(room, 'Add NoxGamingQC as friend in BlackSquad to play with him, his username his: NoxRacing')
    }

    if ((message.toLowerCase()).includes("!golfwithyourfriends")) {
        TwitchClient.action(room, 'The name of the private lobby is "nox" and the password is "gaming"')
    }

    if ((message.toLowerCase()).includes("!rocketleague")) {
        TwitchClient.action(room, 'The name of the private match is: "nox" and the password is: "gaming". Let\'s go and join the game!')
    }

    if ((message.toLowerCase()).includes("!warframe")) {
        TwitchClient.action(room, 'Join warframe here and get awesome bonus: https://www.warframe.com/signup?referrerId=561fa9c43ade7f6737b9a6cb')
    }
}
