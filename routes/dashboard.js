const mongoose = require('mongoose');
var express = require('express');
var dashboardRouter = express.Router();

dashboardRouter.get('/', async function(req, res, next) {
	const User = mongoose.model('User');
	const Product = mongoose.model('Product');
	const Category = mongoose.model('Category');
	const usersCount = await User.countDocuments();
	const productsCount = await Product.countDocuments();
	const categoriesCount = await Category.countDocuments();
	res.render('dashboard', {
		title: 'Dashboard',
		usersCount: usersCount,
		categoriesCount: categoriesCount,
		productsCount: productsCount,
		layout: 'layout'
	});
});

module.exports = dashboardRouter;
