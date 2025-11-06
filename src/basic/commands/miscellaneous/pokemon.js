import { Events, MessageFlags, EmbedBuilder } from 'discord.js';

export default function pokemon (client, commands) {
    commands.push({
        name: 'pokemon',
        description: 'Get information about a Pokémon.',
        options: [
            {
                name: 'pokemon',
                description: 'The Pokémon ID or name to request',
                type: 3,
                required: true
            }
        ]
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'pokemon') {
            await interaction.deferReply({ephemeral: true});
            console.log("Fetching Pokémon data...");
            let response = await fetch(process.env.WEBSITE_API_LINK + '/pokemon/' + interaction.options.getString('pokemon'), {
			method: 'GET',
			headers: {
				'Authorization': process.env.WEBSITE_TOKEN
			}
		});
		if (response.status != 200) {
			let data = await response.json();
			console.error("Error when trying to get Pokémon data: " + response.status);
			console.error(data);
            interaction.editReply({ content: `Error code ${response.status} : We ran into an issue when trying to get Pokémon data`, flags: MessageFlags.Ephemeral});
		} else {
			let data = await response.json();
            const reply = await interaction.fetchReply();
            const pokemon = reply.createdTimestamp - interaction.createdTimestamp;
            const pokemonInformation = new EmbedBuilder()
                //.setColor(data.data.color)
                .setTitle(data.data.name)
                .setAuthor({ name: client.user.username + ' - POKÉMON', iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setDescription(data.data.description)
                .setThumbnail(data.data.sprite)
                .addFields(
                    { name: 'id', value: data.data.id.toString() },
                    { name: 'Types', value: data.data.types.join(', '), inline: true },
                    { name: 'Height', value: data.data.height.toString(), inline: true },
                    { name: 'Weight', value: data.data.weight.toString(), inline: true }
                )
                .setTimestamp()
                .setFooter({ text: interaction.user.globalName, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) });
            interaction.editReply({ embeds: [pokemonInformation], flags: MessageFlags.Ephemeral});
        }

        }
    });
}