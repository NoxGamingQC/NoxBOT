import { Events } from 'discord.js';

export default function ping (client, commands) {
    commands.push({
        name: 'ping',
        description: 'Replies with Pong!',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'ping') {
            await interaction.deferReply();

            const reply = await interaction.fetchReply();
            const ping = reply.createdTimestamp - interaction.createdTimestamp;

            interaction.editReply(`Pong! :ping_pong:\n\n|:hourglass: Client: ${ping}ms\n|:stopwatch: Websocket: ${client.ws.ping}ms`);
        }
    });
}