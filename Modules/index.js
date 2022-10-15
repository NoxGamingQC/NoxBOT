const inviteModule = require("./invite.js");

exports.commands = function(prefix, message) {
    inviteModule.command(prefix, message);

    if(message == prefix + "ping") {
        message.channel.send("pong");
    }
};