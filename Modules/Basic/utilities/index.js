var invite = require("./invite.js");
var ping = require("./ping.js");

exports.module = function(message) {
    invite.command(message);
    ping.command(message);
};