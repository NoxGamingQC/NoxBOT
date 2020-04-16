# NoxBOT

[![Build Status](https://api.travis-ci.com/NoxGamingQC/NoxBOT.svg?branch=master&status=errored)](https://travis-ci.com/NoxGamingQC/NoxBOT)
[![Dependencies](https://david-dm.org/NoxGamingQC/NoxBOT.svg)](https://david-dm.org/NoxGamingQC/NoxBOT)
[![Dev-Dependencies](https://david-dm.org/NoxGamingQC/NoxBOT/dev-status.svg)](https://david-dm.org/NoxGamingQC/NoxBOT?type=dev)
[![Online Discord Members](https://discordapp.com/api/guilds/605028700182020101/widget.png?style=shield)](https://discord,gg/reKASKN)

## Setting up your environement

### Prerequirement

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

- `pm2 start noxbot.js`

## Stopping the bot

- `pm2 stop noxbot.js`

## Get bot logs

- `pm2 logs noxbot`

## Creator and contributors

- NoxGamingQC
- Gouliram
- Theros

### Usefull Link

[GitHub](https://github.com/NoxGamingQC/NoxBOT)

[Website](http://noxgamingqc.herokuapp.com/noxbot)
