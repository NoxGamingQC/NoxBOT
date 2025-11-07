import utility from './utility/index.js';
import miscellaneous from './miscellaneous/index.js';
import music from './music/index.js';

export default async function slashCommands(client, commands) {
    miscellaneous(client, commands)
    utility(client, commands);
    music(client, commands);
}