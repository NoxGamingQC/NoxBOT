exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }

    if ((message.toLowerCase()).includes("!pst")) {
        TwitchClient.action(room, 'NoxGamingQC is part of the Positivity Stream Team. Want to apply? Join their Discord right here: https://discord.gg/KPxXwYW')
    };
}