const dateFormat = require('date-format');

/**
 * @param {object} pgk - A single package from the npms API
 * @returns {string} - The command-modifier subtitle for the package
 */
const cmdSubtitle = ({author, date, publisher, version}) => {
	let subtitle = `${version}`;

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

module.exports = cmdSubtitle;
