import { Events, MessageFlags } from 'discord.js';
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
                if(global.connection) {
                    global.connection.subscribe(audioPlayer);
                    console.log(interaction);
                    var args = /*interaction.content.split(' ').slice(1)*/
                    audioPlayer.play(ytdl(args.join(" ")))
                    interaction.editReply({ content: `Song: ` + args.join(" ") + ` , is currently playing`, flags: MessageFlags.Ephemeral});
                } else {
                    interaction.editReply({ content: `I can't find you. Please use /init first.`, flags: MessageFlags.Ephemeral});
                }
            } catch (error) {
                console.log(error);
                interaction.editReply({ content: `An error occured when trying to play a song.`, flags: MessageFlags.Ephemeral});
            }
        }
    });
}