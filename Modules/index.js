const inviteModule = require("./invite.js");

exports.index = function (prefix, message) {
    inviteModule.commands(prefix, message);

    if(message == prefix + "ping") {
        message.channel.send("pong");
    }
}