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
            if(message) {
                message.channel.send('Hmm... We didn\'t found what you were looking for. You should probably look back to command you might have did a typo. If you think this is a mistake, please let us know.');
            }
        }
    });
}