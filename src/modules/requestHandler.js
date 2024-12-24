import { JSDOM } from 'jsdom';
import jQuery from 'jquery';
var { window } = new JSDOM( "" );
var { document } = (new JSDOM('')).window;

export default function requestHandler(url, requestType, dataHandler, message = null, data = null, client = null) {
    jQuery(window).ajax({
        url: url,
        type: requestType,
        success: function (response) {
            console.log(response);
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