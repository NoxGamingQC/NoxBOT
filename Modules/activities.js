var request = require("../request.js");

exports.setActivity = function(bot) {
    var url = process.env.WEBSITE_BASE_LINK + "activities";
    var activityResponse = request.get(url, "GET");
    console.log(activityResponse['code'])
    console.log(activityResponse.code)
    if(activityResponse['code'] == 200) {
        const keys = Object.keys(activityResponse['response']);
        const randIndex = Math.floor(Math.random() * keys.length);
        const randKey = keys[randIndex];
        bot.user.setActivity(activityResponse['response'][randKey]);
    }
};