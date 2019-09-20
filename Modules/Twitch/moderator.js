exports.commands = function (room, chatter, message, self, reportError) {
    if (chatter.mod || chatter.badges['broadcaster'] === '1') {
        if (self) {
            return;
        }
        if ((message.toLowerCase()).includes("!rabbit")) {
            TwitchClient.action(room, 'A movie night is about to start! Join now at https://www.rabb.it/noxracing')
        };
        if(message.toLowerCase().split(' ')[0].includes('!so') && message.toLowerCase().split(' ')[1]) {
            TwitchClient.action(room, 'Hey racers, ' + message.toLowerCase().split(' ')[1] + ' just stopped by! Go throw them a follow at https://twitch.tv/' + message.toLowerCase().split(' ')[1] + ' . They\'re awesome streamer. ;)')
        }
    }
}
