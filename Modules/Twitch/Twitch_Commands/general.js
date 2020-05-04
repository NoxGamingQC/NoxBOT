var moment = require('moment');
exports.commands = function (room, chatter, message, self, reportError) {
        if (self) {
            return;
        }
        if ((message.toLowerCase()).includes("!commands")) {
            TwitchClient.action(room, 'You can get the full command list there: http://noxgamingqc.herokuapp.com/stream/commands')
        };
        if ((message.toLowerCase()).includes("!extralife")) {
            TwitchClient.action(room, '@' + chatter['display-name'] + ', you can help NoxGamingQC to help children of his local Children\'s Miracle Network hospitals at https://www.extra-life.org/participant/noxracinggaming')
        };
        if ((message.toLowerCase()).includes("!time")) {
            TwitchClient.action(room, '@' + chatter['display-name'] + ', it is now ' + moment().utcOffset(-4).format('HH:mm') +' for NoxGamingQC')
        };
}
