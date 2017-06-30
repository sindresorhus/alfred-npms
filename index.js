'use strict';
const alfy = require('alfy');
const dateFormat = require('date-format');

// Do not boost exact matches by default, unless specified by the input
const q = /boost-exact:[^\s]+/.test(alfy.input) ? alfy.input : `${alfy.input} boost-exact:false`;

alfy.fetch('https://api.npms.io/v2/search', {
	query: {
		q,
		size: 20
	}
}).then(data => {
	const items = data.results
		.filter(x => x.package.name.length > 1)
		.map(x => {
			const pkg = x.package;

			return {
				title: pkg.name,
				subtitle: pkg.description,
				arg: pkg.links.repository || pkg.links.npm,
				mods: {
					alt: {
						arg: pkg.links.npm,
						subtitle: 'Open the npm page instead of the GitHub repo'
					},
					cmd: {
						subtitle: `${pkg.version} published at ${dateFormat('yyyy-dd-MM', new Date(pkg.date))} by ${(pkg.author && pkg.author.name) || pkg.publisher.username}`
					}
				},
				quicklookurl: pkg.links.repository && `${pkg.links.repository}#readme`
			};
		});

	alfy.output(items);
});
