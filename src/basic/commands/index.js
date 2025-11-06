import utility from './utility/index.js';
import music from './music/index.js';
import miscellaneous from './miscellaneous/index.js';

export default function slashCommands(client, commands) {
    music(client, commands);
    miscellaneous(client, commands)
    utility(client, commands);
}