import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv'
import { JSDOM } from 'jsdom';
var { window } = new JSDOM( "" );

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
dotenv.config({ path: './.env' });

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
    client.user.setStatus(process.env.BOT_STATUS);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.BOT_TOKEN);