'use strict';
const got = require('got');

got('https://api.npms.io/search', {
	json: true,
	query: {
		term: process.argv[2],
		size: 20
	}
})
.then(res => {
	const items = res.body.results
		.filter(x => x.name.length > 1)
		.map(x => {
			return {
				title: x.name,
				subtitle: x.description,
				arg: x.links.repository || x.links.npm,
				mods: {
					alt: {
						arg: x.links.npm,
						subtitle: 'Open the npm page instead of the GitHub repo'
					}
				},
				quicklookurl: x.links.repository && `${x.links.repository}#readme`
			};
		});

	console.log(JSON.stringify({items}));
})
.catch(err => {
	console.log(JSON.stringify({
		items: [{
			title: err.name,
			subtitle: err.message,
			valid: false,
			text: {
				copy: err.stack
			}
		}]
	}));
});
