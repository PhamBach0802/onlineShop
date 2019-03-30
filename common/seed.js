const mongoose = require('mongoose');

async function seedUserData() {
	const User = mongoose.model('User');
	const userCount = await User.countDocuments();
	console.log('Current users count', userCount);
	if (userCount === 0) {
		const insertResult = await User.insertMany(require('../data/users.json'));
		console.log('Insert initial users data:', insertResult.length, 'inserted');
		return insertResult;
	}

	return false;
}

async function seedCategoryData() {
	const Category = mongoose.model('Category');
	const categoryCount = await Category.countDocuments();
	console.log('Current categories count', categoryCount);
	if (categoryCount === 0) {
		const insertResult = await Category.insertMany(require('../data/categories.json'));
		console.log('Insert initial categories data:', insertResult.length, 'inserted');
		return insertResult;
	}

	return false;
}

async function seedProductData() {
	const Product = mongoose.model('Product');
	const productCount = await Product.countDocuments();
	console.log('Current products count', productCount);
	if (productCount === 0) {
		const insertResult = await Product.insertMany(require('../data/products.json'));
		console.log('Insert initial products data:', insertResult.length, 'inserted');
		return insertResult;
	}
	return false;
}

module.exports = function seedData() {
	return Promise.all([seedUserData(), seedCategoryData(), seedProductData()]).then(
		(seedResults) => {
			return seedResults.some((i) => i);
		}
	);
};
