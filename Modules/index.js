var inviteModule = require("./Basic/utilities/invite.js");
var helpModule = require("./Basic/help/index.js");

exports.commands = function(message) {
    inviteModule.command(message);
    helpModule.command(message);

    if(message == process.env.PREFIX + "ping") {
        message.channel.send("pong");
    }
};