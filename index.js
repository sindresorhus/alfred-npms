'use strict';
const alfy = require('alfy');

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
			const date = new Date(pkg.date);
			const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
			const dates = months.concat(['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']);
			const publishDate = `${date.getFullYear()}-${dates[date.getDate() - 1]}-${months[date.getMonth()]}`;

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
						subtitle: `${pkg.version} published at ${publishDate} by ${(pkg.author && pkg.author.name) || pkg.publisher.username}`
					}
				},
				quicklookurl: pkg.links.repository && `${pkg.links.repository}#readme`
			};
		});

	alfy.output(items);
});
