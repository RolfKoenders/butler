'use strict';

const ForecastIO = require('forecast-io');
const moment = require('moment');
const config = require('../config');

const forecast = new ForecastIO(config.get('weather.apikey'));

function weatherHandler(message, callback) {
	let responseMessage = ``;

	let options = {
		location: {
			lat: config.get('weather.location.lat'),
			long: config.get('weather.location.long')
		},
		lang: 'nl'
	};

	_getForecast(options).then(result => {
		const days = result.daily.data;
		if (days.length) {
			for (const day of days) {
				const dateTimeString = moment.unix(day.time).format('DD-MMM');
				const temperatureMax = Math.round(day.temperatureMax);
				const temperatureMin = Math.round(day.temperatureMin);
				responseMessage += `*${dateTimeString}* - _${day.summary}_ Max: ${temperatureMax}℃  Min: ${temperatureMin}℃ \n`;
			}
		} else {
			responseMessage = `Sorry, there is currently no weather information available.`;
		}
		callback(responseMessage);
	});
}

function _getForecast(options) {
	return forecast.latitude(options.location.lat)
		.longitude(options.location.long)
		.units('si')
		.language(options.lang)
		.exclude('hourly')
		.get()
		.then(result => {
			result = JSON.parse(result);
			return result;
		})
		.catch(err => {
			console.log('Something went wrong :/ ', err);
		});
}

module.exports = weatherHandler;
