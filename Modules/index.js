const inviteModule = require("./invite.js");

exports.index = function (prefix, message) {
    inviteModule.commands(prefix, message);
}