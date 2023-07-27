
exports.get = function(url, requestType, message = null) {
    $.ajax({
        url: url,
        type: requestType,
        success: function (response) {
            console.log('response: '+response);
            return {
                'code': 200,
                'response': response
            }
        },
        error: function(error){
            if(message) {
                message.channel.send('An error occured while trying to search for the pokemon species. Please contact us @ noxgamingqc.ca and submit a bug report.');
            }
            return {
                'code': 500,
                'response': error
            }
        }
    });
}