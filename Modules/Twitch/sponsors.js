exports.commands = function (client, room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!streamlabs")) {
        client.action(room, 'Want to start streaming? Try Streamlabs today: https://streamlabs.com/slobs/d/619690 (Streamlabs download link)')
    }
}

