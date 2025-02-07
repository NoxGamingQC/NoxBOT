import { Events } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default function play (client, commands) {
    commands.push({
        name: 'play',
        description: 'Play some music',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'play') {
            await interaction.deferReply({ephemeral: true});
            
            interaction.editReply({ content: `Song: ? , is currently playing`, ephemeral: true});
        }
    });
}