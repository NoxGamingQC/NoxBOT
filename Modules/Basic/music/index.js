var init = require("./init.js");
var leave = require("./leave.js");
var play = require("./play.js");

var streamOptions = { 
    seek: 0,
    volume: 1,
    filter: 'audioonly',
    dlChunkSize: 0,
    highWaterMark: 1 << 25
};

exports.module = function(message) {
    init.command(message);
    play.command(message, streamOptions);
    leave.command(message);
};