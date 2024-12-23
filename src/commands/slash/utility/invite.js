import { Events } from 'discord.js';

export default function invite (client, commands) {
    commands.push({
        name: 'invite',
        description: 'Get the link to our official server!',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'invite') {
            interaction.reply(`You can invite your friend to join our server with the link below: ${process.env.DISCORD_INVITE}`);
        }
    });
}