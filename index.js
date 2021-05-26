'use strict';
const alfy = require('alfy');
const cmdSubtitle = require('./source/cmd-subtitle');

// Do not boost exact matches by default, unless specified by the input
const q = /boost-exact:[^\s]+/.test(alfy.input) ? alfy.input : `${alfy.input} boost-exact:false`;

const data = await alfy.fetch('https://api.npms.io/v2/search', {
	query: {
		q,
		size: 20
	}
});

const items = data.results
	.filter(result => result.package.name.length > 1)
	.map(result => {
		const pkg = result.package;

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
					subtitle: cmdSubtitle(pkg)
				},
				ctrl: {
					arg: pkg.name,
					subtitle: 'Copy package name'
				}
			},
			quicklookurl: pkg.links.repository && `${pkg.links.repository}#readme`
		};
	});

alfy.output(items);
