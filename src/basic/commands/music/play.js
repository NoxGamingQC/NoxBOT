import { Events } from 'discord.js';
import { createAudioPlayer } from '@discordjs/voice';

import  fs from 'fs';
import ytdl from 'ytdl-core';



export default function play (client, commands) {
    commands.push({
        name: 'play',
        description: 'Play some music',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'play') {
            await interaction.deferReply({epohemeral: true});
            try {
                var audioPlayer = createAudioPlayer()
                global.connection.subscribe(audioPlayer);
                console.log(interaction);
                var args = interaction.content.split(' ').slice(1)
                audioPlayer.play(ytdl(args.join(" ")))
                interaction.editReply({ content: `Song: ` + args.join(" ") + ` , is currently playing`, ephemeral: true});
            } catch (error) {
                console.log(error);
                interaction.editReply({ content: `An error occured when trying to play a song.`, ephemeral: true});
            }
        }
    });
}