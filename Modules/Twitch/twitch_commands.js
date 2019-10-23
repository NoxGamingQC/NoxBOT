const twitchGeneral = require('./Twitch_Commands/general.js');
const twitchGames = require('./Twitch_Commands/games.js');
const twitchHelp = require('./Twitch_Commands/help.js');
const twitchMiscs = require('./Twitch_Commands/misc.js');
const twitchModerator = require('./Twitch_Commands/moderator.js');
const twitchNoxbuttSays = require('./Twitch_Commands/noxbutt_says.js');
const twitchSponsors = require('./Twitch_Commands/sponsors.js');
const twitchSocials = require('./Twitch_Commands/social.js');
const twitchTeam = require('./Twitch_Commands/team.js');

const twitchEventListener = require('./Twitch_Commands/event_listeners.js');

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
