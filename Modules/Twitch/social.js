exports.commands = function (client, room, chatter, message, self, reportError) {
    if (self) {
        return;
    }
    if ((message.toLowerCase()).includes("!curse")) {
        client.action(room, 'You can join NoxFam\'s server on Curse/Twitch at https://app.twitch.tv/servers/Eo9w5X')
    }
    if ((message.toLowerCase()).includes("!discord")) {
        client.action(room, chatter['display-name'] + ' you can join the Kingdom on Discord at https://discord.gg/KPd4cC4')
    }
    if ((message.toLowerCase()).includes("!instagram")) {
        client.action(room, 'Follow @NoxGamingQC on Instagram at https://www.instagram.com/noxgamingqc/')
    }
    if ((message.toLowerCase()).includes("!psn")) {
        client.action(room, 'NoxGamingQC psn username is HowlNox22607')
    }
    if ((message.toLowerCase()).includes("!steam")) {
        client.action(room, 'Here you can add NoxRacing as friend: https://steamcommunity.com/id/NoxGamingQC')
    }
    if ((message.toLowerCase()).includes("!twitter")) {
        client.action(room, 'Follow @NoxGamingQC on Twitter at https://twitter.com/noxgamingqc')
    }
    if ((message.toLowerCase()).includes("!website")) {
        client.action(room, 'You can access NoxGamingQC\'s website here: http://rebrand.ly/noxgamingqc')
    }
    if ((message.toLowerCase()).includes("!youtube")) {
        client.action(room, 'Subscribe to NoxGamingQC\'s YouTube channel here: https://www.youtube.com/channel/UCytKDUapog2tnJD4XenehiQ')
    }
}
