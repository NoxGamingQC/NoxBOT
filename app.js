import { Client, Events, GatewayIntentBits, REST, Routes, ActivityType } from 'discord.js';
import dotenv from 'dotenv'
import { JSDOM } from 'jsdom';
import basicCommands from './src/basic/commands/index.js';
import setActivity from './src/basic/modules/setActivity.js';

var { window } = new JSDOM( "" );

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
dotenv.config({ path: './.env' });
const commands = [];

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
  
    readyClient.user.setPresence({ activities: [{ name: 'Currently being rewriten.', type: ActivityType.Custom}], status: process.env.BOT_STATUS, afk: true });
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
});

client.login(process.env.BOT_TOKEN);

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);


basicCommands(client, commands);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}