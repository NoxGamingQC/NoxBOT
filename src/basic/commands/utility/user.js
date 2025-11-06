import { Events, MessageFlags } from 'discord.js';

export default function ping (client, commands) {
    commands.push({
        name: 'user',
        description: 'Display information about you!',
    });
    var statusType = {
      '0': 'Playing ',
      '1': 'Streaming ',
      '2': 'Listening ',
      '3': 'Watching ',
    };

    var statusColor = {
        'online': 4437377,
        'idle': 16426522,
        'dnd': 15746887,
        'offline': 7634829,
    
    };
    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'user') {
            await interaction.deferReply({ephemeral: true});

            const reply = await interaction.fetchReply();
            const userInformation = new EmbedBuilder()
                //.setColor(data.data.color)
                .setTitle(interaction.user.name)
                .setAuthor({ name: client.user.username + ' - USER', iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setDescription('Comming soon')
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .addFields(
                    { name: 'id', value: '' },
                    { name: 'Creation date', value: '', inline: true },
                    { name: 'Bot', value: '', inline: true },
                    { name: 'Streaming', value: '', inline: true },
                    { name: 'Status', value: '', inline: true },
                    { name: 'Device', value: '', inline: true }
                )
                .setTimestamp()
                .setFooter({ text: interaction.user.globalName, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) });
            interaction.editReply({ embeds: [userInformation], flags: MessageFlags.Ephemeral});
        }
    });
}
