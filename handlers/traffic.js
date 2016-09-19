'use strict';

const request = require('request');
const cheerio = require('cheerio');

const VID_URL = 'http://www.vid.nl/VI/overzicht';

function getAllTrafic(message, callback) {
	let responseMessage = `:car: :car: :car: :car: \n`;
	_getTrafficIncidents(incidents => {
		if (incidents.length > 0) {
			for (const incident of incidents) {
				responseMessage += `*${incident.roadNumber}* ${incident.hoofdTraject} - _${incident.description}_ \n\n`;
			}
		} else {
			responseMessage = `There are no details. :slightly_smiling_face:`;
		}
		callback(responseMessage);
	});
}

function filterTraffic(message, callback) {
	let responseMessage = ``;
	const filterOn = message.matchResult[1];
	_getTrafficIncidents(incidents => {
		if (incidents.length > 0) {
			let filtered = 0;

			incidents.map(incident => {
				if (incident.roadNumber.toLowerCase() === filterOn) {
					responseMessage += `*${incident.roadNumber}* ${incident.hoofdTraject} - _${incident.description}_ \n\n`;
					filtered++;
					return incident;
				}
				return false;
			});

			if (filtered === 0) {
				responseMessage = `There are no incidents on the *${filterOn}* :slightly_smiling_face:`;
			}
		} else {
			responseMessage = `There are no incidents! :slightly_smiling_face:`;
		}
		callback(responseMessage);
	});
}

function _getTrafficIncidents(callback) {
	let incidents = [];
	request(VID_URL, function (error, response, html) {
		if (!error && response.statusCode === 200) {
			const $ = cheerio.load(html);

			$('#overzicht-verkeer > dl').attr('itemscope', 'itemscope').each(function () {
				const $incident = $(this).children('dt');
				if ($incident.attr('class') === 'vi-hoofdtraject vi-bericht') {
					const roadNumber = $incident.attr('class', 'vi-bericht').children('span').text();
					const hoofdTraject = $incident.attr('class', 'vi-bericht').text().split(roadNumber)[1];
					const $dd = $(this).children('dd');
					/* eslint-disable no-regex-spaces */
					const description = $dd.attr('itemprop', 'location').attr('itemscope', 'itemscope').text().trim().replace(/\n/g, '').replace(/  +/g, ' ');
					/* eslint-enable no-regex-spaces */
					incidents.push({roadNumber, hoofdTraject, description});
				}
			});
			callback(incidents);
		}
	});
}

module.exports = {getAllTrafic, filterTraffic};
