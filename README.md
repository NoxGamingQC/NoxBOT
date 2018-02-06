# NoxButt

## Settings up your environement

### Prerequisites

- npm
- nodejs
- A discord account

### Windows 10 environement setup

- Activate the developper mode on Windows 10
- Navigate to "Activate or desactivate Windows functionality"
- Check "Sub-system Windows for Linux (beta)"
- Open Linux commandline
- Install git: `sudo apt-get install git`
- Install ssh: `sudo apt-get install ssh`
- Install npm: `sudo apt-get install npm`
- Generate an ssh key: `ssh keygen`
- Accept the default location
- Enter a password
- Retype your password to confirm it
- Check if the ssh folder contain the key: `ls ~/.ssh`
- Display the ssh key: `~/.ssh/id_rsa.pub`

### Ubuntu environement setup

- Open a terminal
- Install git: `sudo apt-get install git`
- Install ssh: `sudo apt-get install ssh`
- Install npm: `sudo apt-get install npm`
- Generate an ssh key: `ssh keygen`
- Accept the default location
- Enter a password
- Retype your password to confirm it
- Check if the ssh folder contain the key: `ls ~/.ssh`
- Display the ssh key: `~/.ssh/id_rsa.pub`

### Step

- Create a new repository
- Navigate into the new repository
- Fork the project
- Import the git repository into it `git remote add origin <repository_git_url>`
- Duplicate `config.json.exemple` and name it `config.json`
- Go to [Discord devloppers website](https://discordapp.com/developers/applications/me) and create a new app
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

- **!psn**: Get NoxRacing's PSN Username
- **!steam**: Get NoxRacing's Steam profile link
- **!twitch**: Get NoxRacing's Twitch channel link
- **!xbl**: Get NoxRacing's Xbox Live Username

- **!rank list**: List of all joinable roles
- **!rank join 'role'**: Make you join a role
- **!rank leave 'role'**: Make you remove you a role

- **!color set 'color':** Give you a color
- **!color reset:** Remove your color
- **!color see 'color':** Give you a demo of the color
- **!color list:** Give you a list of color

## Creator and contributors

- NoxRacing

### Usefull Link

[GitHub](https://github.com/NoxRacing/NoxButt)

[Website](http://noxracing.herokuapp.com/projects/NoxButt)
