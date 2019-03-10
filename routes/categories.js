const fs = require("fs");
const format = require("date-fns/format");

var dataObj = {};
fs.readFile("./data/categories.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	dataObj = JSON.parse(data);
});

module.exports = router => {
	router.get("/categories", function(req, res, next) {
		res.render("categories", {
			categories: dataObj,
			layout: "layout"
		});
	});

	router.get("/categories/:id", function(req, res, next) {
		const id = req.params.id;
		let category = dataObj.find(value => {
			if (value._id === id) {
				return true;
			}
			return false;
		});

		res.render("categoryDetail", {
			category: category,
			layout: "layout"
		});
	});
};
