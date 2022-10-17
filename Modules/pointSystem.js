exports.addPoints = function(user) {
    $.ajax({
        url: process.env.WEBSITE_BASE_LINK + "points/add",
        type: "points",
        data: {
            'token': process.env.WEBSITE_TOKEN,
            'user': user,
            'points': process.env.BASE_POINT,
            'mulitplier': process.env.POINT_MULTIPLIER
        },
        error: function(error){
            console.log(error);
        }
    });
};