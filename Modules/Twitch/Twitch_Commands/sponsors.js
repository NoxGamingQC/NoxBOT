exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!streamlabs")) {
        TwitchClient.action(room, 'Want to start streaming? Try Streamlabs today: https://streamlabs.com/slobs/d/619690')
    }

    if ((message.toLowerCase()).includes("!instantgaming")) {
        TwitchClient.action(room, 'Want to buy some game and want to saves on them, Instant Gaming sells game key at a cheap price for steam, origin and uplay: https://www.instant-gaming.com/en/?igr=NoxGamingQC')
    }

    if ((message.toLowerCase()).includes("!humblebundle")) {
        TwitchClient.action(room, 'Want to buy some games and gives that money to charity instead? Humble Bundle is there for you!: https://www.humblebundle.com/?partner=noxgamingqc')
    }
}
