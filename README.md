# NoxBOT

A multitasking Discord Bot.

[![License](https://img.shields.io/github/license/NoxGamingQC/Noxbot?style=for-the-badge)](#)
[![Discord.JS](https://img.shields.io/badge/Discord.JS-11.6.1-blue?style=for-the-badge)](#)
<img alt="Discord" src="https://img.shields.io/discord/938558244924829756?style=for-the-badge&logo=discord&logoColor=%23ffffff&label=%20&labelColor=%23697EC4&color=%237289DA&link=https%3A%2F%2Fnoxgamingqc.ca%2Fdiscord">

## Travis build status

[![Build Status](https://api.travis-ci.com/NoxGamingQC/NoxBOT.svg?branch=master&status=errored)](https://travis-ci.com/NoxGamingQC/NoxBOT)

## Table of Contents

* [General Info](#general-information)
* [Setup](#setup)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)
* [License](#license)

## General Information

* A list of feature will be added soon on our [website](https://www.noxgamingqc.ca/noxbot).

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

[NoxGamingQC](https://www.noxgamingqc.ca/)

## Contributors

[Gouliram](https://github.com/gouliram)

## License

This project is open source and available under the [MIT License](./LICENSE.md).
