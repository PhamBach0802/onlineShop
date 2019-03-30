const format = require("date-fns/format");
const Product = require("../models/Product");
var express = require("express");
var productRouter = express.Router();

productRouter.get("/products", function(req, res, next) {
	var obj = JSON.parse(req.query.filter);
	console.log(obj);
	if(req.query != 'undefined'){
		Product.find({})
				.where("salePrice").equals(obj.where.salePrice)
				.limit(obj.limit)
				.skip(obj.offset)
				.exec()
				.then(products => {
					console.log(products);
					res.json(products);
				})
				.catch(err => {
					res.send(err);
				})
	}
	else{
		Product.find({})
		.exec()
		.then(products => {
			res.render("products", {
				products: products,
				layout: "layout"
			});
		})
		.catch(err => {
			res.render(err);
		});
	}
});

productRouter.get("/products/:id", function(req, res, next) {
	const id = req.params.id;
	Product.findById(id)
		.exec()
		.then(product => {
			res.render("productDetail", {
				product: product,
				layout: "layout"
			});
		})
		.catch(err => {
			res.render(err);
		});
});
module.exports = productRouter;
