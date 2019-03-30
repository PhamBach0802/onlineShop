const format = require("date-fns/format");
const Category = require('../models/Category');
var express = require('express');
var categoryRouter = express.Router();

categoryRouter.get("/categories", function(req, res, next) {
	Category.find({})
			.exec()
			.then(categories => {
				res.render("categories", {
					categories: categories,
					layout: "layout"
				});
			})
			.catch(err => {
				res.render(err);
			});
});

categoryRouter.get("/categories/:id", function(req, res, next) {
	const id = req.params.id;
	Category.findById(id)
			.exec()
			.then(category => {
				res.render("categoryDetail", {
					category: category,
					layout: "layout"
				});
			})
			.catch(err => {
				res.render(err);
			})
});

module.exports = categoryRouter;
