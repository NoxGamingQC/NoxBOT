import play from './play.js';
import skip from './skip.js';
import pause from './pause.js';
import resume from './resume.js';
import stop from './stop.js';
import leave from './leave.js';
import queueCmd from './queue.js';

export default function music(client, commands) {
  play(client, commands);
  skip(client, commands);
  pause(client, commands);
  resume(client, commands);
  stop(client, commands);
  leave(client, commands);
  queueCmd(client, commands);
}
