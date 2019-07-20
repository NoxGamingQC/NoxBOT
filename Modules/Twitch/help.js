exports.commands = function (client, room, chatter, message, self, reportError) {
    if (self) {
        return;
    }

    if ((message.toLowerCase()).includes("!hotline")) {
        client.action(room, 'If you are thinking about suicide, please call this number 1 (800) 273-8255. International listing => http://www.suicide.org/international-suicide-hotlines.html')
    };
}
