import utility from './utility/index.js';
import music from './music/index.js';

export default function slashCommands(client, commands) {
    music(client, commands)
    utility(client, commands);
}