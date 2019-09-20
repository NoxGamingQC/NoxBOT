var moment = require('moment');
exports.commands = function (room, chatter, message, self, reportError) {
        if (self) {
            return;
        }
        if ((message.toLowerCase()).includes("!commands")) {
            TwitchClient.action(room, 'You can get the full command list there: https://noxracinggaming.wixsite.com/noxracing/bot-commands')
        };
        if ((message.toLowerCase()).includes("!extralife")) {
            TwitchClient.action(room, '@' + chatter['display-name'] + ', you can help NoxRacing to help children of his local Children\'s Miracle Network hospitals at https://www.extra-life.org/participant/noxracinggaming')
        };
        if ((message.toLowerCase()).includes("!time")) {
            TwitchClient.action(room, '@' + chatter['display-name'] + ', it is now ' + moment().utcOffset(-5).format('HH:mm') +' for NoxRacing')
        };
}
