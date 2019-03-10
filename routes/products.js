const fs = require("fs");
const format = require("date-fns/format");

var dataObj = {};
fs.readFile("./data/products.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	dataObj = JSON.parse(data);
});

module.exports = router => {
	router.get("/products", function(req, res, next) {
		res.render("products", {
			products: dataObj,
			layout: "layout"
		});
	});

	router.get("/products/:id", function(req, res, next) {
		const id = req.params.id;
		let product = dataObj.find(value => {
			if (value._id === id) {
				return true;
			}
			return false;
		});

		res.render("productDetail", {
			product: product,
			layout: "layout"
		});
	});
};
