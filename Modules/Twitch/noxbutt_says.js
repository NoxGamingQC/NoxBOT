exports.commands = function (client, room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!no")) {
        client.say(room, 'VoteNay')
    }

    if ((message.toLowerCase()).includes("!noxbutt_says_play")) {
        client.say(room, '!play')
    }

    if ((message.toLowerCase()).includes("!yeah")) {
        client.say(room, 'VoteYea')
    }
}
