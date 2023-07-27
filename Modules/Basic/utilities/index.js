var invite = require("./invite.js");
var ping = require("./ping.js");
var user = require("./user.js");
var server = require("./server.js");

exports.commands = function(message) {
    invite.command(message);
    ping.command(message);
    user.command(message);
    server.command(message);
};