import { Events, MessageFlags, EmbedBuilder } from 'discord.js';

export default function warframe (client, commands) {
    commands.push({
        name: 'warframe',
        description: 'Get information about a Pokémon.',
        options: [
            {
                name: 'type',
                description: 'The type of request (Warframe, Weapon, etc.)',
                type: 3,
                required: true,
                choices: [
                    { name: 'Warframe', value: 'warframe' },
                    //{ name: 'Weapon', value: 'weapon' },
                    //{ name: 'Companion', value: 'companion' },
                    //{ name: 'Archwing', value: 'archwing' }
                ]
            },
            {
                name: 'warframe',
                description: 'The Warframe name to request',
                type: 3,
                required: true
            }
        ]
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'warframe') {
            await interaction.deferReply({ephemeral: true});
            console.log("Fetching Warframe data...");
            let response = await fetch(process.env.WEBSITE_API_LINK + '/warframe/' + interaction.options.getString('type') + '/' + interaction.options.getString('warframe'), {
            method: 'GET',
            headers: {
                'Authorization': process.env.WEBSITE_TOKEN
            }
        });
        if (response.status != 200) {
            let data = await response.json();
            console.error("Error when trying to get Warframe data: " + response.status);
            console.error(data);
            interaction.editReply({ content: `Error code ${response.status} : We ran into an issue when trying to get Warframe data`, flags: MessageFlags.Ephemeral});
        } else {
            let data = await response.json();
            const reply = await interaction.fetchReply();
            if(interaction.options.getString('type') === 'warframe') {
                const warframeInformation = new EmbedBuilder()
                    //.setColor(data.data.color)
                    .setTitle(data.data.name)
                    .setAuthor({ name: client.user.username + ' - WARFRAME', iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                    .setDescription(data.data.description)
                .setThumbnail(data.data.img)
                    .addFields(
                        { name: 'Gender', value: data.data.gender.toString(), inline: true  },
                        { name: 'Power', value: data.data.power.toString(), inline: true  },
                        { name: 'Armor', value: data.data.armor.toString(), inline: true  },
                        { name: 'Shield', value: data.data.shield.toString(), inline: true  },
                        { name: 'Health', value: data.data.health.toString(), inline: true  },
                        { name: 'Is Prime', value: data.data.is_prime.toString(), inline: true  },
                        { name: 'Release date', value: data.data.release_date.toString(), inline: true  },
                        { name: 'Aura', value: data.data.aura.toString(), inline: true  },
                        { name: 'Abilities', value: data.data.abilities.join(', '), inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: interaction.user.globalName, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) });
                    interaction.editReply({ embeds: [warframeInformation], flags: MessageFlags.Ephemeral});
            } else {
                interaction.editReply({ content: `The type ${interaction.options.getString('type')} is not yet implemented.`, flags: MessageFlags.Ephemeral});
            }
        }
        }
    });
}