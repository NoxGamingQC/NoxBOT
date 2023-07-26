# NoxBOT

A multitasking Discord Bot.


[![Type](https://img.shields.io/badge/project%20type-bot-blue?style=for-the-badge)](#)
[![State](https://img.shields.io/badge/state-In%20development-228C22?style=for-the-badge)](#)
[![Repo size](https://img.shields.io/github/repo-size/NoxGamingQC/NoxBOT?style=for-the-badge&logo=github&logoColor=%23ffffff)](#)
[![License](https://img.shields.io/github/license/NoxGamingQC/NoxBOT?style=for-the-badge)](#)
[![License](https://img.shields.io/travis/com/NoxGamingQC/NoxBOT?style=for-the-badge&label=Travis%20build&logo=travis&logoColor=%23ffffff)](#)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/NoxGamingQC/NoxBOT?style=for-the-badge&logo=codeclimate&logoColor=%23ffffff)](#)
[![Code Climate issues](https://img.shields.io/codeclimate/issues/NoxGamingQC/NoxBOT?style=for-the-badge&logo=codeclimate&logoColor=%23ffffff)](#)

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

#### Technology used

Below is a list of technology that we used. For some package you might need to verify the version you have installed, it might be required.

[![DiscordJS](https://img.shields.io/badge/Discord.JS-11.6.1-blue?style=for-the-badge)](#)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Discord account](https://img.shields.io/badge/A%20Discord%20account-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

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
