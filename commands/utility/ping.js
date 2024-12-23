import { Events } from 'discord.js';

export default function ping (client, commands) {
    commands.push({
        name: 'ping',
        description: 'Replies with Pong!',
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong! :ping_pong:\n\n:hourglass: Time: N/A\n:sparkles: Micro: N/A\n:stopwatch: WS: N/A');
        }
    });
}