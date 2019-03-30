var express = require('express');
const User = require('../models/User');
var userRouter = express.Router();

userRouter.get("/users", function(req, res, next) {
	User.find({})
		.exec()
		.then(users => {
			res.render("users", {
				users: users,
				layout: "layout"})
			})
		.catch(err => {
			res.render(err);
		});
});

userRouter.get("/users/:id", function(req, res, next) {
	const id = req.params.id;
	User.findById(id)
		.exec()
		.then(user => {
			res.render("userDetail", {
				user: user,
				layout: "layout"
			});
		})
		.catch(err => {
			res.render(err);
		});
});

userRouter.get("/addNewUser", function(req, res, next) {
	res.render("addNewUser", {
		layout: "layout"
	});
});

userRouter.post("/addNewUser", (req, res) => {
	console.log(req.body);
	// User.create(req.body)
	// 	.then(newUser => {
	// 		res.send(newUser);
	// 	})
	// 	.catch(err => {
	// 		res.send(err);
	// 	});
});
module.exports = userRouter;
