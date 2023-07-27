var request = require("../request.js");

exports.setActivity = function(bot) {
    var url = process.env.WEBSITE_BASE_LINK + "activities";
    request.get(url, "GET", null, () => activityHandler(result));
};

function activityHandler(result) {
    _callback();    
    const keys = Object.keys(result);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    bot.user.setActivity(result[randKey]);
}