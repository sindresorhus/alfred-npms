import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const alfy = alfyTest();

	const result = await alfy('boost-exact:true chalk'); // Ensure chalk is first
	delete result[0].mods.cmd;

	t.deepEqual(result[0], {
		title: 'chalk',
		subtitle: 'Terminal string styling done right',
		arg: 'https://github.com/chalk/chalk',
		mods: {
			alt: {
				arg: 'https://www.npmjs.com/package/chalk',
				subtitle: 'Open the npm page instead of the GitHub repo'
			},
			ctrl: {
				arg: 'chalk',
				subtitle: `Paste Package chalk`
			}
		},
		quicklookurl: 'https://github.com/chalk/chalk#readme'
	});
});
