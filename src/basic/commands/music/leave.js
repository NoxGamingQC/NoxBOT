import { Events, MessageFlags } from 'discord.js';

export default function play (client, commands) {
    commands.push({
        name: 'leave',
        description: 'Leave the voice channel',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'leave') {
            await interaction.deferReply({ephemeral: true});
            try {
                if (global.connection) { 
                    global.connection.destroy();
                    interaction.editReply({ content: `:wave: Channel left.`, flags: MessageFlags.Ephemeral});
                } else {
                    interaction.editReply({ content: `:thinking: Am I in a voice chat? I can't find the connection. To fix this issue, connect to a voice channel, then use command \`/init\`, so I can reset the connection then do the command \`/leave.\`. If the error persist, please contact a developer. Thank you.`, flags: MessageFlags.Ephemeral});
                }    
            } catch {
                interaction.editReply({ content: `:thinking: Am I in a voice chat? I can't find the connection. To fix this issue, connect to a voice channel, then use command \`/init\`, so I can reset the connection then do the command \`/leave.\`. If the error persist, please contact a developer. Thank you.`, flags: MessageFlags.Ephemeral});
            }
        }
    });
}