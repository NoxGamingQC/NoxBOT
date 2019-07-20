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

exports.twitchCommands = function (bot, client, dbConnection, reportError) {
    twitchEventListener.listener(bot, client, dbConnection, reportError);
    client.on('message', function (room, chatter, message, self, reportError) {
        twitchGeneral.commands(client, room, chatter, message, self, reportError);
        twitchGames.commands(client, room, chatter, message, self, reportError);
        twitchHelp.commands(client, room, chatter, message, self, reportError);
        twitchMiscs.commands(client, room, chatter, message, self, reportError);
        twitchModerator.commands(client, room, chatter, message, self, reportError);
        twitchNoxbuttSays.commands(client, room, chatter, message, self, reportError);
        twitchSponsors.commands(client, room, chatter, message, self, reportError);
        twitchSocials.commands(client, room, chatter, message, self, reportError);
        twitchTeam.commands(client, room, chatter, message, self, reportError);
    });
}
