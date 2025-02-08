import init from './init.js';
import play from './play.js';
import leave from './leave.js'

export default function music(client, commands) {
    init(client, commands);
    play(client, commands);
    leave(client, commands);
}