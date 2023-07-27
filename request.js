exports.get = function(url, requestType, dataHandler, message = null) {
    console.log('Sending request to: ' + url)
    $.ajax({
        url: url,
        type: requestType,
        success: function (response) {
            console.log('200 - Response received with success')
            dataHandler(response);
        },
        error: function(error){
            console.log('500 - An error occured when trying to reach out the url')
            if(message) {
                message.channel.send('An error occured while trying to search for the pokemon species. Please contact us @ noxgamingqc.ca and submit a bug report.');
            }
        }
    });
}