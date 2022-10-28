# NoxBOT

> A multitasking Discord Bot.!-- If you have the project hosted somewhere, include the link here. -->

[![Build Status](https://api.travis-ci.com/NoxGamingQC/NoxBOT.svg?branch=master&status=errored)](https://travis-ci.com/NoxGamingQC/NoxBOT)
[![License](https://img.shields.io/github/license/NoxGamingQC/Noxbot)](#)
[![Discord.JS](https://img.shields.io/badge/Discord.JS-11.6.1-blue)](#)
[![Online Discord Members](https://discord.com/api/guilds/938558244924829756/widget.png?style=shield)](https://noxgamingqc.ca/discord)

## Table of Contents

* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
* [License](#license)

## General Information

* A list of feature will be added soon on our website.

## Setup

### Setting up your environement

#### Prerequirement

* npm
* nodejs
* A discord account

#### Windows 10 environement setup

* Activate the developper mode on Windows 10
* Navigate to "Activate or desactivate Windows functionality"
* Check "Sub-system Windows for Linux (beta)"
* Open Linux commandline
* Install git: `sudo apt-get install git`
* Install ssh: `sudo apt-get install ssh`
* Install npm: `sudo apt-get install npm`
* Generate an ssh key: `ssh keygen`
* Accept the default location
* Enter a password
* Retype your password to confirm it
* Check if the ssh folder contain the key: `ls ~/.ssh`
* Display the ssh key: `~/.ssh/id_rsa.pub`

#### Ubuntu environement setup

* Open a terminal
* Install git: `sudo apt-get install git`
* Install ssh: `sudo apt-get install ssh`
* Install npm: `sudo apt-get install npm`
* Generate an ssh key: `ssh keygen`
* Accept the default location
* Enter a password
* Retype your password to confirm it
* Check if the ssh folder contain the key: `ls ~/.ssh`
* Display the ssh key: `~/.ssh/id_rsa.pub`

### Step

* Create a new repository
* Navigate into the new repository
* Fork the project
* Import the git repository into it `git remote add origin <repository_git_url>`
* Duplicate `config.json.exemple` and name it `config.json`
* Go to [Discord devloppers website](https://discordapp.com/developers/applications/me) and create a new app
* Make the app a bot user
* Replace the token line by your discord bot token
* Install the node_modules `npm install`
* The bot should work if there any issue report it on the main repository Link at the bottom of the page

## Usage

To start the bot simply run

```bash
npm start
```

## Project Status

Project is: _in progress_

## Acknowledgements

[GitHub](https://github.com/NoxGamingQC/NoxBOT)
[Website](https://noxgamingqc.ca)

## Author

[@noxgamingqc](https://www.noxgamingqc.ca/)

## Contributors

[Gouliram](https://github.com/gouliram)

## License

This project is open source and available under the [MIT License](./LICENSE.md).
