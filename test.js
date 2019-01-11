import test from 'ava';
import alfyTest from 'alfy-test';
import semverRegex from 'semver-regex';

test('main', async t => {
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
				subtitle: 'Copy package name'
			}
		},
		quicklookurl: 'https://github.com/chalk/chalk#readme'
	});
});

test('command-modifier subtitle with date and author', async t => {
	const alfy = alfyTest();

	const result = await alfy('boost-exact:true chalk');
	const {subtitle} = result[0].mods.cmd;

	t.regex(subtitle, new RegExp(`${semverRegex().source} published at.*by.*`));
});

test('command-modifier subtitle without date and author', async t => {
	const alfy = alfyTest();

	const result = await alfy('boost-exact:true @types/consola');
	const {subtitle} = result[0].mods.cmd;

	t.regex(subtitle, semverRegex());
});
