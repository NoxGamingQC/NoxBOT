exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()) == "!no") {
        TwitchClient.say(room, 'VoteNay')
    }

    if ((message.toLowerCase()).includes("!noxbutt_says_play")) {
        TwitchClient.say(room, '!play')
    }

    if ((message.toLowerCase()) == "!yeah") {
        TwitchClient.say(room, 'VoteYea')
    }
}
