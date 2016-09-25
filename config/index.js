'use strict';

const convict = require('convict');
const pathExists = require('path-exists');

let confFile = `${__dirname}/config.json`;
let conf = convict({
	bot: {
		token: {
			doc: 'Slackbot token',
			format: String,
			default: null,
			env: 'BL_SLACK_KEY'
		},
		name: {
			doc: 'Name of the slackbot',
			format: String,
			default: 'butler',
			env: 'BL_SLACK_NAME'
		}
	},
	weather: {
		apikey: {
			doc: 'Forecast.io api key',
			format: String,
			default: null,
			env: 'BL_WEATHER_KEY'
		}
	}
});

if (pathExists.sync(confFile)) {
	conf.loadFile(confFile);
}

conf.validate({strict: true});

module.exports = conf;
