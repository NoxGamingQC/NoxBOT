# NoxButt

## Settings up your environement

### Prerequisites

- npm
- nodejs
- A discord account

### Step

- Create a new repository
- Navigate into the new repository
- Fork the project
- Import the git repository into it `git remote add origin <repository_git_url>`
- Duplicate `config.json.exemple` and name it `config.json`
- Go to https://discordapp.com/developers/applications/me
- And create a new app
- Make the app a bot user
- Replace the token line by your discord bot token
- Install the node_modules `npm install`
- Install pm2 so the bot will be able to restart if it crash `npm install pm2 -g`
- The bot should work if there any issue report it on the main repository Link at the bottom of the page


## Starting the bot

    - `pm2 start app.js`

## Stopping the bot

    - `pm2 stop app.js`

## Get bot logs

    - `pm2 logs app`

## Bot commands

- **!commands**: Display bot commands
- **!avatar 'user mention'**: Display the avatar of the user
- **!invite**: Generate an invite link to the server
- **!lmgtfy**: Send you a LMGTFY link
- **!ping**: Display the current ping of the bot
- **!rank list**: List of all joinable roles
- **!rank join 'role'**: Make you join a role
- **!rank leave 'role'**: Make you remove you a role

## Creator and contributors

- NoxRacing

---

### Usefull Link

[GitHub](https://github.com/NoxRacing/NoxButt)

[Website](http://noxracing.herokuapp.com/projects/NoxButt)
