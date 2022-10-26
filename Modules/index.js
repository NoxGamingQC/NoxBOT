var inviteModule = require("./Basic/invite.js");
var helpModule = require("./Basic/help.js");

exports.commands = function(message) {
    inviteModule.command(message);
    helpModule.command(message);

    if(message == process.env.PREFIX + "ping") {
        message.channel.send("pong");
    }
};