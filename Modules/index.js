const inviteModule = require("./invite.js");

exports.commands = function(message) {
    inviteModule.command(message);

    if(message == process.env.PREFIX + "ping") {
        message.channel.send("pong");
    }
};