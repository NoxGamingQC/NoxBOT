exports.get = function(url, requestType, message = null, _callback = null) {
    $.ajax({
        url: url,
        type: requestType,
        success: function (response) {
            return response;
        },
        complete: function () { 
            if(_callback) {
                _callback();    
            }
        },
        error: function(error){
            if(message) {
                message.channel.send('An error occured while trying to search for the pokemon species. Please contact us @ noxgamingqc.ca and submit a bug report.');
            }
        }
    });
}