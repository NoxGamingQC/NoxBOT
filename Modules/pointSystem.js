exports.isActive() = function(userID) {
    if(process.env.WEBSITE_BASE_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        return true;
    }
    return false;
}

exports.addPoints = function(userID, comment) {
    $.ajax({
        url: process.env.WEBSITE_BASE_LINK + "points/add",
        type: "post",
        data: {
            websiteToken: process.env.WEBSITE_TOKEN,
            botID: bot.user.id,
            userID: userID,
            points: process.env.BASE_POINT,
            mulitplier: process.env.POINT_MULTIPLIER,
            comment: comment
        },
    });
};