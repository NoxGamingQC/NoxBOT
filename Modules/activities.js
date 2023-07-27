var request = require("../request.js");

exports.setActivity = function(bot) {
    var url = process.env.WEBSITE_BASE_LINK + "activities";
    request.get(url, "GET", dataHandler(result))
};

function dataHandler(result) {
    const keys = Object.keys(result.response);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    bot.user.setActivity(result.response[randKey]);
}