var express = require('express');
var router = express.Router();
const multer = require('multer');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
});
const upload = multer({
    storage: storage
});

router.get("/addNewUser", function(req, res, next) {
	res.render("addNewUser", {
		layout: "layout"
	});
});

router.get("/addNewProduct", function(req, res, next) {
	res.render("addNewProduct", {
		layout: "layout"
	});
});

router.get("/addNewCategory", function(req, res, next) {
	res.render("addNewCategory", {
		layout: "layout"
	});
});

router.post('/addNewUser',function(req, res) {

	const file = req.file.filename;
	const userDetails = req.body;
	req.body.avatar = file;
	console.log(file);
	console.log(userDetails);
	User.create(req.body)
	.then(newUser => {
		console.log(newUser);
		res.redirect('/admin/users');
	})
	.catch(err => {
		console.log(err);
		res.send(err);
	});
});

router.post('/addNewProduct', upload.single('avatar'), function(req, res) {

	const producDetails = req.body;
	console.log(producDetails);
	Product.create(req.body)
	.then(newProduct => {
		console.log(newProduct);
		res.redirect('/admin/products');
	})
	.catch(err => {
		console.log(err);
		res.send(err);
	});
});

router.post('/addNewCategory', upload.single('avatar'), function(req, res) {

	const categoryDetails = req.body;
	console.log(categoryDetails);
	Category.create(req.body)
	.then(newCategory => {
		console.log(newCategory);
		res.redirect('/admin/categories');
	})
	.catch(err => {
		console.log(err);
		res.send(err);
	});
});


router.patch(`/userDetail/:id`, upload.single('avatar'), function(req, res) {

	console.log("patch");
	const file = req.file.filename;
	req.body.avatar = file;

	var id = req.params.id;
	//id = "5c9fb57ec6648c3c4c2f3321";
	const updatedBody = req.body;
	console.log(updatedBody);
	User.findByIdAndUpdate(id, updatedBody, { runValidators: false })
		.exec()
		.then(user => {
			// Object.assign({}, user.toObject(), updatedBody);
			//res.send({ ...user.toObject(), ...updatedBody });
			res.redirect('/admin/users');
		})
		.catch(err => {
			res.send(err);
		});
});

router.patch(`/productDetail/:id`,upload.single('avatar'), function(req, res) {
	console.log("patch");
	var id = req.params.id;
	const updatedBody = req.body;
	console.log(updatedBody);
	Product.findByIdAndUpdate(id, updatedBody, { runValidators: false })
		.exec()
		.then(product => {
			// Object.assign({}, user.toObject(), updatedBody);
			//res.send({ ...user.toObject(), ...updatedBody });
			res.redirect('/admin/products');
		})
		.catch(err => {
			res.send(err);
		});
});

router.patch(`/categoryDetail/:id`,upload.single('avatar'), function(req, res) {
	console.log("patch");
	var id = req.params.id;
	const updatedBody = req.body;
	console.log(updatedBody);
	Category.findByIdAndUpdate(id, updatedBody, { runValidators: false })
		.exec()
		.then(category => {
			// Object.assign({}, user.toObject(), updatedBody);
			//res.send({ ...user.toObject(), ...updatedBody });
			res.redirect('/admin/categories');
		})
		.catch(err => {
			res.send(err);
		});
});


router.put(`/userDetail/:id`, upload.single('avatar'), function(req, res) {

	console.log("put");

	const id = req.params.id;
	const updatedBody = req.body;
	console.log(updatedBody);
	User.findByIdAndUpdate(id, updatedBody, { runValidators: true })
		.exec()
		.then(user => {
			// Object.assign({}, user.toObject(), updatedBody);
			res.send({ ...user.toObject(), ...updatedBody });
		})
		.catch(err => {
			res.send(err);
		});
});

router.delete(`/userDetail/:id`, (req, res) => {
	console.log("delete");

	const id = req.params.id;
	const updatedBody = req.body;
	console.log(updatedBody);
	User.findByIdAndRemove(id)
		.exec()
		.then(user => {
			// Object.assign({}, user.toObject(), updatedBody);
			//res.send({ ...user.toObject(), ...updatedBody });
			res.redirect('/admin/users');
		})
		.catch(err => {
			res.send(err);
		});
});

router.delete(`/productDetail/:id`, (req, res) => {
	console.log("delete");

	const id = req.params.id;
	const updatedBody = req.body;
	console.log(updatedBody);
	Product.findByIdAndRemove(id)
		.exec()
		.then(product => {
			// Object.assign({}, user.toObject(), updatedBody);
			//res.send({ ...user.toObject(), ...updatedBody });
			res.redirect('/admin/products');
		})
		.catch(err => {
			res.send(err);
		});
});

router.delete(`/categoryDetail/:id`, (req, res) => {
	console.log("delete");

	const id = req.params.id;
	const updatedBody = req.body;
	console.log(updatedBody);
	Category.findByIdAndRemove(id)
		.exec()
		.then(category => {
			// Object.assign({}, user.toObject(), updatedBody);
			//res.send({ ...user.toObject(), ...updatedBody });
			res.redirect('/admin/categories');
		})
		.catch(err => {
			res.send(err);
		});
});


module.exports = router;
