var init = require("./init.js");
var leave = require("./leave.js");
var play = require("./play.js");
var ytdl = require('ytdl-core');
var streamOptions = { seek: 0, volume: 1 };

exports.module = function(message) {
    init.command(message);
    play.command(message, ytdl, streamOptions);
    leave.command(message);
};