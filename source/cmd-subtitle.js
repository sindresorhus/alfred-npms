'use strict';
const dateFormat = require('date-format');

/**
@param {object} pkg - A single package from the npms API.
@returns {string} The command-modifier subtitle for the package.
*/
module.exports = ({author, date, publisher, version}) => {
	let subtitle = `${version}`;

	// TODO: Behind an if-statement because of https://github.com/npms-io/npms-api/issues/82
	if (date) {
		subtitle += ` published at ${dateFormat('yyyy-dd-MM', new Date(date))}`;
	}

	if (author) {
		subtitle += ` by ${(author && author.name)}`;
	} else if (publisher) {
		subtitle += ` by ${publisher.username}`;
	}

	return subtitle;
};
