import { Events, MessageFlags } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default function play (client, commands) {
    commands.push({
        name: 'init',
        description: 'Connect to the voice channel of the user',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'init') {
            await interaction.deferReply({ephemeral: true});
            try {
                if(interaction.member.voice.channel) {
                    global.connection = joinVoiceChannel({
                        channelId: interaction.member.voice.channel.id,
                        guildId: interaction.member.voice.guild.id,
                        adapterCreator: interaction.member.voice.guild.voiceAdapterCreator
                    });
                    interaction.editReply({ content: `:smile: Connected to voice chat`, flags: MessageFlags.Ephemeral});
                } else {
                    interaction.editReply({ content: `:face_with_spiral_eyes: I had some trouble finding your voice channel. Are you in one?`, flags: MessageFlags.Ephemeral});
                }
            } catch (error) {
                interaction.editReply({ content: `:face_with_spiral_eyes: I'm dizzy. Can you send this error to a developper. Thank you. Error happen durring \`/init\``, flags: MessageFlags.Ephemeral});
            }
            
        }
    });
}