const twitchGeneral = require('./Twitch/general.js');
const twitchGames = require('./Twitch/games.js');
const twitchHelp = require('./Twitch/help.js');
const twitchMiscs = require('./Twitch/misc.js');
const twitchModerator = require('./Twitch/moderator.js');
const twitchNoxbuttSays = require('./Twitch/noxbutt_says.js');
const twitchSponsors = require('./Twitch/sponsors.js');
const twitchSocials = require('./Twitch/social.js');
const twitchTeam = require('./Twitch/team.js');

const twitchEventListener = require('./Twitch/event_listeners.js');

exports.twitchCommands = function () {
    twitchEventListener.listener(TwitchClient);
    TwitchClient.on('message', function (room, chatter, message, self, reportError) {
        twitchGeneral.commands(room, chatter, message, self);
        twitchGames.commands(room, chatter, message, self);
        twitchHelp.commands(room, chatter, message, self);
        twitchMiscs.commands(room, chatter, message, self);
        twitchModerator.commands(room, chatter, message, self);
        twitchNoxbuttSays.commands(room, chatter, message, self);
        twitchSponsors.commands(room, chatter, message, self);
        twitchSocials.commands(room, chatter, message, self);
        twitchTeam.commands(room, chatter, message, self);
    });
}
