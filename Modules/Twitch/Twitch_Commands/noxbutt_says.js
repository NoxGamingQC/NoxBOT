exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!no")) {
        TwitchClient.say(room, 'VoteNay')
    }

    if ((message.toLowerCase()).includes("!noxbutt_says_play")) {
        TwitchClient.say(room, '!play')
    }

    if ((message.toLowerCase()).includes("!yeah")) {
        TwitchClient.say(room, 'VoteYea')
    }
}
