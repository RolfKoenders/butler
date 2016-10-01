#!/usr/bin/env node
'use strict';

/*
 * Butler launch script.
*/

const Bot = require('slackbotify');
const config = require('../config');

let bot = new Bot(config.getProperties());

bot.requireRegister(require('butler-plugin-loader'));
bot.requireRegister(require('butler-vid'));
bot.requireRegister(require('butler-weather'));
bot.requireRegister(require('butler-jokes'));

bot.run();
