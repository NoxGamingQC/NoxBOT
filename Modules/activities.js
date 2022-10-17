exports.setActivity = function(bot) {
    $.ajax({
        url: process.env.WEBSITE_BASE_LINK + "activities",
        type: "GET",
        data: [],
        success: function(result){
            const keys = Object.keys(result);
            const randIndex = Math.floor(Math.random() * keys.length);
            const randKey = keys[randIndex];
            bot.user.setActivity(result[randKey]);
        },
        error: function(error){
            console.log(error);
        }
    });
};