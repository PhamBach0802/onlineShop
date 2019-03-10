const fs = require("fs");
const format = require("date-fns/format");

var dataObj = {};
fs.readFile("./data/users.json", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	dataObj = JSON.parse(data);

	dataObj.forEach((value) => {
		value.dobnew = new Date(value.dob);

		value.dobnew = format(value.dobnew, "mm/dd/yyyy");
	});
});

module.exports = router => {
	router.get("/users", function(req, res, next) {
		res.render("users", {
			users: dataObj,
			layout: "layout"
		});
	});

	router.get("/users/:id", function(req, res, next) {
		const id = req.params.id;
		let user = dataObj.find(value => {
			if (value._id === id) {
				return true;
			}
			return false;
		});

		res.render("userDetail", {
			user: user,
			layout: "layout"
		});
	});
};
