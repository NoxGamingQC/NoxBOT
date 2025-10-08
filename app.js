import { Client, Events, GatewayIntentBits, REST, Routes, ActivityType, Emoji } from 'discord.js';
import dotenv from 'dotenv'
import { JSDOM } from 'jsdom';
import basicCommands from './src/basic/commands/index.js';
import setActivity from './src/basic/modules/setActivity.js';
import WebSocket from 'ws';

var { window } = new JSDOM( "" );
const global = (0,eval)("this");

const client = new Client({ intents: 131071/*[
    GatewayIntentBits.Guilds,
    //GatewayIntentBits.GuildMessages,
    //GatewayIntentBits.MessageContent,
    //GatewayIntentBits.GuildMembers,
    //GatewayIntentBits.GuildVoiceState
    GUILD_VOICE_STATES
] */});
dotenv.config({ path: './.env' });
const commands = [];


//discord
client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
    global.bot = readyClient;
    readyClient.user.setPresence({activities: [{name: '🇨🇦 Currently being rewriten. Thanks for your patience.', state: '🇨🇦 Currently being rewriten. Thanks for your patience.', type: ActivityType.Custom}], status: process.env.BOT_STATUS, afk: false });
  });
  
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  });
  
  client.login(process.env.BOT_TOKEN);
  

//twitch

let twitchData = await fetch('https://www.noxgamingqc.ca/api/noxbot/twitch/setup/' + process.env.WEBSITE_TOKEN, {
	method:'GET',
	headers: {

	}
});

if (twitchData.status == 200){
	let data = await twitchData.json();
	const TWITCH_BOT_USER_ID = data.data.bot_id;
	const TWITCH_OAUTH_TOKEN = data.data.oauth_token;
	const TWITCH_CLIENT_ID = data.data.client_id;

	const CHAT_CHANNEL_USER_ID = data.data.streamers.noxgamingqc;
	const EVENTSUB_WEBSOCKET_URL = 'wss://eventsub.wss.twitch.tv/ws';

	var websocketSessionID;


	// Start executing the bot from here
	(async () => {
		// Verify that the authentication is valid
		await getAuth();

		// Start WebSocket client and register handlers
		const websocketClient = startWebSocketClient();
	})();

	// WebSocket will persist the application loop until you exit the program forcefully

	async function getAuth() {
		// https://dev.twitch.tv/docs/authentication/validate-tokens/#how-to-validate-a-token
		let response = await fetch('https://id.twitch.tv/oauth2/validate', {
			method: 'GET',
			headers: {
				'Authorization': 'OAuth ' + TWITCH_OAUTH_TOKEN
			}
		});

		if (response.status != 200) {
			let data = await response.json();
			console.error("Token is not valid. /oauth2/validate returned status code " + response.status);
			console.error(data);
			process.exit(1);
		}

		console.log("Validated token.");
	}

	function startWebSocketClient() {
		let websocketClient = new WebSocket(EVENTSUB_WEBSOCKET_URL);

		websocketClient.on('error', console.error);

		websocketClient.on('open', () => {
			console.log('WebSocket connection opened to ' + EVENTSUB_WEBSOCKET_URL);
		});

		websocketClient.on('message', (data) => {
			handleWebSocketMessage(JSON.parse(data.toString()));
		});

		return websocketClient;
	}

	function handleWebSocketMessage(data) {
		switch (data.metadata.message_type) {
			case 'session_welcome': // First message you get from the WebSocket server when connecting
				websocketSessionID = data.payload.session.id; // Register the Session ID it gives us

				// Listen to EventSub, which joins the chatroom from your bot's account
				registerEventSubListeners();
				break;
			case 'notification': // An EventSub notification has occurred, such as channel.chat.message
				switch (data.metadata.subscription_type) {
					case 'channel.chat.message':
						// First, print the message to the program's console.
						console.log(`MSG #${data.payload.event.broadcaster_user_login} <${data.payload.event.chatter_user_login}> ${data.payload.event.message.text}`);

						// Then check to see if that message was "HeyGuys"
						if (data.payload.event.message.text.trim() == "HeyGuys") {
							// If so, send back "VoHiYo" to the chatroom
							sendChatMessage("VoHiYo")
						}

						break;
				}
				break;
		}
	}

	async function sendChatMessage(chatMessage) {
		let response = await fetch('https://api.twitch.tv/helix/chat/messages', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + TWITCH_OAUTH_TOKEN,
				'Client-Id': TWITCH_CLIENT_ID,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				broadcaster_id: CHAT_CHANNEL_USER_ID,
				sender_id: TWITCH_BOT_USER_ID,
				message: chatMessage
			})
		});

		if (response.status != 200) {
			let data = await response.json();
			console.error("Failed to send chat message");
			console.error(data);
		} else {
			console.log("Sent chat message: " + chatMessage);
		}
	}

	async function registerEventSubListeners() {
		// Register channel.chat.message
		let response = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + TWITCH_OAUTH_TOKEN,
				'Client-Id': TWITCH_CLIENT_ID,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: 'channel.chat.message',
				version: '1',
				condition: {
					broadcaster_user_id: CHAT_CHANNEL_USER_ID,
					user_id: TWITCH_BOT_USER_ID
				},
				transport: {
					method: 'websocket',
					session_id: websocketSessionID
				}
			})
		});

		if (response.status != 202) {
			let data = await response.json();
			console.error("Failed to subscribe to channel.chat.message. API call returned status code " + response.status);
			console.error(data);
			process.exit(1);
		} else {
			const data = await response.json();
			console.log(`Subscribed to channel.chat.message [${data.data[0].id}]`);
			sendChatMessage('Connected to chat');
			var announcements = Array(
				'/announcepurple Soyez de la course en nous rejoignant sur Discord au https://discord.gg/PryKE2Xvrh',
				'/announcepurple Join the racetrack on Discord at https://discord.gg/PryKE2Xvrh',
				'/announcepurple Suivez NoxGamingQC sur YouTube pour du contenu exclusif: https://www.youtube.com/@noxgamingqc',
				'/announcepurple Follow NoxGamingQC\'s YouTube Channel for some awesome content: https://www.youtube.com/@noxgamingqc',
				'/announcepurple Vous voulez acheter un jeux sans vous ruiner, Instant Gaming vends des clés de jeux à très bas prix: https://www.instant-gaming.com/en/?igr=NoxGamingQC',
				'/announcepurple Want to buy some game and want to saves on them, Instant Gaming sells game key at a cheap price: https://www.instant-gaming.com/en/?igr=NoxGamingQC',
				'/announcepurple Vous voulez acheter un jeux et donner cet argent pour la charité? Humble Bundle est là pour vous!: https://www.humblebundle.com/?partner=noxgamingqc',
				'/announcepurple Want to buy some games and gives that money to charity instead? Humble Bundle is there for you!: https://www.humblebundle.com/?partner=noxgamingqc'
			)
			setInterval(function() {
				sendChatMessage(announcements[Math.floor(Math.random()*announcements.length)]);
			}, 900000);
		}
	}
} else {
	let data = await twitchData.json();
	console.error("Unable to fetch Twitch data:  " + twitchData.status);
	console.error(data);
}


//miscs
  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
  
  
  basicCommands(client, commands);
  
  try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
