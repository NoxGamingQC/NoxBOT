exports.addPoints = function(user) {
    $.ajax({
        url: process.env.WEBSITE_BASE_LINK + "points/add",
        type: "post",
        data: {
            'token': process.env.WEBSITE_TOKEN,
            'botID': bot.user.id,
            'user': user,
            'points': process.env.BASE_POINT,
            'mulitplier': process.env.POINT_MULTIPLIER
        },
        error: function(error){
            console.log(error);
        }
    });
};