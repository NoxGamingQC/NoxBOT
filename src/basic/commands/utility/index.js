import invite from './invite.js';
import ping from './ping.js';
import user from './user.js';

export default function utility(client, commands) {
    invite(client, commands);
    ping(client, commands);
    user(client, commands);
}