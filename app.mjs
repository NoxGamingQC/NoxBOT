import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv'
import { JSDOM } from 'jsdom';
var { window } = new JSDOM( "" );
import modules from './Modules/index.js'
import discordServerList from './Modules/discordServerList.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
dotenv.config({ path: './.env' });

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
    client.user.setStatus(process.env.BOT_STATUS);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
});

client.login(process.env.BOT_TOKEN);

client.on('message', function (message) {
    if(message.guild) {
        discordServerList.getServerConfig(message.guild, message, handleMessage);
        discordServerList.updateServer(message.guild.id, message.guild.name, message.guild.iconURL)
    } else {
        modules.loadAllModules(message, process.env.PREFIX);
    }
});