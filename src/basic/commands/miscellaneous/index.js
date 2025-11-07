import pokemon from './pokemon.js';
import warframe from './warframe.js';

export default function miscellaneous(client, commands) {
    pokemon(client, commands);
    warframe(client, commands);
}