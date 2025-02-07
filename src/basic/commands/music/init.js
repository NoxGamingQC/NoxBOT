import { Events } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default function play (client, commands) {
    commands.push({
        name: 'init',
        description: 'Connect to the voice channel of the user',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'init') {
            await interaction.deferReply({ephemeral: true});
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.member.voice.guild.id,
                adapterCreator: interaction.member.voice.guild.voiceAdapterCreator
            });
            console.log(connection);
            interaction.editReply({ content: `Connected to voice chat`, ephemeral: true});
        }
    });
}