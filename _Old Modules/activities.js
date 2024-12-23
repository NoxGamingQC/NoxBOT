var request = require("../Essentials/request.js");

exports.setActivity = function() {
    var url = process.env.WEBSITE_BASE_LINK + "activities";
    request.get(url, "GET", dataHandler)
};

function dataHandler(result) {
    const keys = Object.keys(result);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    discordBot.user.setActivity(process.env.PREFIX + result[randKey]);
}