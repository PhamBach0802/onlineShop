const utils = require('./utils');

test('Test utils.sum()', () => {
	expect(utils.sum(3, 4)).toBe(7);
});

test('Test utils.validateEmail()', () => {
	expect(utils.validateEmail('name@gmail.com')).toBe(true);
	expect(utils.validateEmail('namegmail.com')).toBe(false);

	expect(utils.validateEmail('name@social.club')).toBe(true);
	expect(utils.validateEmail('name@social.site')).toBe(true);
});
