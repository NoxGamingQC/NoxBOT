exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }

    if ((message.toLowerCase()).includes("!hotline")) {
        TwitchClient.action(room, 'If you are thinking about suicide, please call this number 1 (800) 273-8255. International listing => http://www.suicide.org/international-suicide-hotlines.html')
    };
}
