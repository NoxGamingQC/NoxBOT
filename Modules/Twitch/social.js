exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!curse")) {
        TwitchClient.action(room, 'You can join NoxFam\'s server on Curse/Twitch at https://app.twitch.tv/servers/Eo9w5X')
    }
    if ((message.toLowerCase()).includes("!discord")) {
        TwitchClient.action(room, chatter['display-name'] + ' you can join the Kingdom on Discord at https://discord.gg/KPd4cC4')
    }
    if ((message.toLowerCase()).includes("!instagram")) {
        TwitchClient.action(room, 'Follow @NoxGamingQC on Instagram at https://www.instagram.com/noxgamingqc/')
    }
    if ((message.toLowerCase()).includes("!psn")) {
        TwitchClient.action(room, 'NoxGamingQC psn username is HowlNox22607')
    }
    if ((message.toLowerCase()).includes("!steam")) {
        TwitchClient.action(room, 'Here you can add NoxRacing as friend: https://steamcommunity.com/id/NoxGamingQC')
    }
    if ((message.toLowerCase()).includes("!twitter")) {
        TwitchClient.action(room, 'Follow @NoxGamingQC on Twitter at https://twitter.com/noxgamingqc')
    }
    if ((message.toLowerCase()).includes("!website")) {
        TwitchClient.action(room, 'You can access NoxGamingQC\'s website here: http://rebrand.ly/noxgamingqc')
    }
    if ((message.toLowerCase()).includes("!youtube")) {
        TwitchClient.action(room, 'Subscribe to NoxGamingQC\'s YouTube channel here: https://www.youtube.com/channel/UCytKDUapog2tnJD4XenehiQ')
    }
}
