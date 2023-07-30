var request = require("../Essentials/request.js");

exports.setActivity = function(bot) {
    var url = process.env.WEBSITE_BASE_LINK + "activities";
    request.get(url, "GET", dataHandler)
};

function dataHandler(result) {
    const keys = Object.keys(result);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    bot.user.setActivity(process.env.PREFIX + result[randKey]);
}