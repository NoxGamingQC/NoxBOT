exports.getActivity = function(websiteBase) {
    $.ajax({
        url: websiteBase + "activities",
        type: "GET",
        data: [],
        success: function(result){
            const keys = Object.keys(result);
            const randIndex = Math.floor(Math.random() * keys.length);
            const randKey = keys[randIndex];
            global.currentActivity = result[randKey];
        },
        error: function(error){
            console.log(error);
            global.currentActivity = "Something went wrong";
        }
    });
    return global.currentActivity;
};