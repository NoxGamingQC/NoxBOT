exports.commands = function (room, chatter, message, self, reportError) {
    if (self) {
        return;
    }

    if ((message.toLowerCase()).includes("!irae")) {
        TwitchClient.say(room, 'NoxGamingQC fais partir d’une grande famille de gamers et gameuses francophone la Irae Gaming. Celle-ci est présente sur plusieurs jeux majoritairement sur PC et PS4. Certain membre diffuse certaine de leurs partie en direct sur Twitch si cela vous intéresse vous pouvez accédez à la webTv' +
        ' au twitch.tv/iraetv #GoIrae')
    };
}
