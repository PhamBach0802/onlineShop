const fs = require("fs");

var usersCount, categoriesCount, productsCount;
var dataObj = {};

fs.readFile("./data/users.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	dataObj = JSON.parse(data);
	usersCount = dataObj.length;
});

fs.readFile("./data/products.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	let dataObj = JSON.parse(data);
	productsCount = dataObj.length;
});

fs.readFile("./data/categories.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	let dataObj = JSON.parse(data);
	categoriesCount = dataObj.length;
});

module.exports = router => {
	router.get('/', function(req, res, next) {
		res.render('dashboard', {
			title: 'Dashboard',
			usersCount: usersCount,
			categoriesCount: categoriesCount,
			productsCount: productsCount,
			layout: 'layout'
		});
});
};
