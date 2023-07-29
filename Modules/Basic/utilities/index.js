var invite = require("./invite.js");
var ping = require("./ping.js");
var user = require("./user.js");
var server = require("./server.js");

exports.commands = function(message, prefix) {
    invite.command(message, prefix);
    ping.command(message, prefix);
    user.command(message, prefix);
    server.command(message, prefix);
};