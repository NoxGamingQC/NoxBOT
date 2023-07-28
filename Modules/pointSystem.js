exports.isActive = function(userID) {
    if(process.env.WEBSITE_API_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        return true;
    }
    return false;
}

exports.addPoints = function(userID, comment) {
    $.ajax({
        url: process.env.WEBSITE_BASE_LINK + "points/add",
        type: "GET",
        data: {
            website_token: process.env.WEBSITE_TOKEN,
            discord_id: userID,
            points: process.env.BASE_POINT,
            mulitplier: process.env.POINT_MULTIPLIER,
            comment: comment
        },
        success: function() {
            console.log('success')
        },
        error: function(error) {
            console.log('An error occured:');
            console.log(error);
        }
    });
};