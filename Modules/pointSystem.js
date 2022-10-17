exports.addPoints = function(userID, comment) {
    $.ajax({
        url: process.env.WEBSITE_BASE_LINK + "points/add",
        type: "post",
        data: {
            token: process.env.WEBSITE_TOKEN,
            botID: bot.user.id,
            userID: userID,
            points: process.env.BASE_POINT,
            mulitplier: process.env.POINT_MULTIPLIER,
            comment: comment
        },
        error: function(error){
            console.log(error);
        }
    });
};