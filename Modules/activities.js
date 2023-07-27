var request = require("../request.js");

exports.setActivity = function(bot) {
    var url = process.env.WEBSITE_BASE_LINK + "activities";
    activityHandler(request.get(url, "GET", null));
};

function activityHandler(result) {
    const keys = Object.keys(result);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    bot.user.setActivity(result[randKey]);
}