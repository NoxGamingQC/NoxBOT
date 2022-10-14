const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
jQuery = require('jquery')(window);

export default () => {
    const { document } = (new JSDOM('')).window;
    global.document = document;
    global.jQuery = jQuery;
    global.$ = jQuery;
}