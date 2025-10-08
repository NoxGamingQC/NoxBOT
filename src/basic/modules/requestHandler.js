import { JSDOM } from 'jsdom';
import jQuery from 'jquery';

var { window } = new JSDOM( "" );
var { document } = (new JSDOM('')).window;
var $ = jQuery(window);

export default function requestHandler(url, requestType, dataHandler, message = null, data = null, client = null) {
    $.ajax({
        url: url,
        type: requestType,
        contentType: "application/json",
        success: function (response) {
            console.log('Web request completed successfuly');
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
            console.log('An error occured when trying to do a web request.');
            if(message) {
                message.channel.send('Hmm... We didn\'t found what you were looking for. You should probably look back to command you might have did a typo. If you think this is a mistake, please let us know.');
            }
        }
    });
}