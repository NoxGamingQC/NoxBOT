var init = require("./init.js");
var leave = require("./leave.js");
var play = require("./play.js");

exports.module = function(message) {
    init.command(message);
    play.command(message);
    leave.command(message);
};