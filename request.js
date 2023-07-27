exports.get = function(url, requestType, dataHandler, message = null, data = null) {
    $.ajax({
        url: url,
        type: requestType,
        success: function (response) {
            if(message && data) {
                dataHandler(response, message, data)
            } else if(message && !data) {
                dataHandler(response, message)
            } else if(!message && data) {
                dataHandler(response, data)
            } else {
                dataHandler(response)
            }
        },
        error: function(error){
            console.log(error);
            if(message) {
                message.channel.send('An error occured while trying to search for the pokemon species. Please contact us @ noxgamingqc.ca and submit a bug report.');
            }
        }
    });
}