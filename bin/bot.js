#!/usr/bin/env node
'use strict';

/*
 * Butler launch script.
*/

const Bot = require('slackbotify');
const config = require('../config');
const handlers = require('../handlers');

let bot = new Bot(config.getProperties());

bot.registerHandler({
	groups: ['direct'],
	match: '!traffic',
	handler: handlers.trafficHandler.getAllTrafic
});

bot.registerHandler({
	groups: ['direct'],
	match: /!traffic (.*)/i,
	handler: handlers.trafficHandler.filterTraffic
})

bot.registerHandler({
	groups: ['direct'],
	match: '!weather',
	handler: handlers.weatherHandler
});

bot.run();
