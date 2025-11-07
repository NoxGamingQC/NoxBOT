import { Events, MessageFlags, EmbedBuilder } from 'discord.js';

export default function user (client, commands) {
    commands.push({
        name: 'user',
        description: 'Display information about you!'
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'user') {
            await interaction.deferReply({ephemeral: true});
            const member = interaction.guild.members.cache.get(interaction.user.id);
            const presence = member.presence;
            const userInformation = new EmbedBuilder()
                //.setColor(data.data.color)
                .setTitle(interaction.user.globalName)
                .setAuthor({ name: client.user.username + ' - USER', iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setDescription(presence ? presence.activities.map(activity => activity.name).join(', ') : 'No current activities')
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .addFields(
                    { name: 'id', value: interaction.user.id, inline: true },
                    { name: 'Bot', value: interaction.user.bot ? 'Yes' : 'No', inline: true },
                    { name: 'Username', value: '@' + interaction.user.username, inline: true },
                    { name: 'Status', value: presence ? presence.status : 'offline', inline: true },
                    { name: 'Desktop', value: presence ? (presence.clientStatus.desktop ? presence.clientStatus.desktop : 'Offline') : 'Offline', inline: true },
                    { name: 'Mobile', value: presence ? (presence.clientStatus.mobile ? presence.clientStatus.mobile : 'Offline') : 'Offline', inline: true }
                )
                .setTimestamp()
                .setFooter({ text: interaction.user.globalName, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) });
                interaction.editReply({ embeds: [userInformation], flags: MessageFlags.Ephemeral});
        }
    });
}
