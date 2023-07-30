
var basic = require("./Basic/index.js");
var premium = require("./Premium/index.js");

exports.loadAllModules = function(message, prefix) {
    basic.loadCommands(message, prefix);
    //premium.loadCommands(message, prefix);
};