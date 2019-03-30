module.exports = {
	sum(a, b) {
		return a + b;
	},

	validateEmail(email) {
		return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email);
	},
};
