import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const alfy = alfyTest();

	const result = await alfy('boost-exact:true chalk');  // Ensure chalk is first

	t.deepEqual(result[0], {
		title: 'chalk',
		subtitle: 'Terminal string styling done right. Much color.',
		arg: 'https://github.com/chalk/chalk',
		mods:
		{
			alt:
			{
				arg: 'https://www.npmjs.com/package/chalk',
				subtitle: 'Open the npm page instead of the GitHub repo'
			}
		},
		quicklookurl: 'https://github.com/chalk/chalk#readme'
	});
});
