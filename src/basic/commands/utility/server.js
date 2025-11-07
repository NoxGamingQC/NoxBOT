import { Events, MessageFlags, EmbedBuilder } from 'discord.js';

export default function user (client, commands) {
    commands.push({
        name: 'server',
        description: 'Display information about the current server'
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'server') {
            await interaction.deferReply({ephemeral: true});
            const server = interaction.guild;
            console.log(server);
            let owner = await client.users.fetch(server.ownerId);
            const serverInformation = new EmbedBuilder()
                .setColor('#880000')
                .setTitle(server.name)
                .setAuthor({ name: client.user.username + ' - Server information', iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setDescription('This server is owned by ' +  owner.globalName)
                .setThumbnail(server.iconURL({ dynamic: true, size: 1024 }))
                .addFields(
                    { name: 'id', value: server.id, inline: true },
                    { name: 'Creation date', value: server.createdAt.toDateString(), inline: true },
                    { name: 'Members', value: server.memberCount.toString(), inline: true },
                    { name: 'Channels', value: server.channels.cache.size.toString(), inline: true },
                    { name: 'Roles', value: server.roles.cache.size.toString(), inline: true },
                    { name: 'MFA level', value: server.mfaLevel.toString(), inline: true },
                    { name: 'Verification level', value: server.verificationLevel.toString(), inline: true },
                    { name: 'Verified', value: server.verified ? 'Yes' : 'No', inline: true }
                    )
                .setTimestamp()
                .setFooter({ text: interaction.user.globalName, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) });
                interaction.editReply({ embeds: [serverInformation], flags: MessageFlags.Ephemeral});
        }
    });
}
