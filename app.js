var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var logger = require("morgan");
const debug = require("debug")("app");

var bodyParser = require("body-parser");
const methodOverride = require("method-override");
const multer = require("multer");

const upload = multer({ dest: path.resolve(__dirname, "../public") });

const seedData = require("./common/seed");

var indexRouter = require("./routes/index");
var dashboardRouter = require("./routes/dashboard");
var userRouter = require("./routes/users");
var productRouter = require("./routes/products");
var categoryRouter = require("./routes/categories");

const http = require("http");

var app = express();
const server = http.Server(app);
app.log = debug;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// register partials
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));
hbs.registerHelper("ifCond", function(v1, v2, options) {
	if (v1 === v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(bodyParser.urlencoded());
// app.use(
// 	methodOverride(function(req, res) {
// 		process.nextTick(() => {
// 			console.log(req);
// 			if (req.body && typeof req.body === "object" && "_method" in req.body) {
// 				// look in urlencoded POST bodies and delete it
// 				var method = req.body._method;
// 				console.log(method);
// 				delete req.body._method;
// 				return method;
// 			}
// 		});
// 	})
// );

app.use("/", indexRouter);
app.use("/admin", dashboardRouter);
app.use("/admin", userRouter);
app.use("/admin", productRouter);
app.use("/admin", categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.start = (PORT, MONGO_URL) => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(MONGO_URL, { useNewUrlParser: true })
			.then(() => {
				debug(MONGO_URL + " database connect success");
				return seedData();
			})
			.then(seedResults => {
				console.log("Any data seeded?", seedResults);
				const server = app.listen(PORT, err => {
					if (err) {
						return reject(err);
					}
					console.log("App started and listening on port", PORT);
					resolve(server);
				});
			})
			.catch(err => {
				debug("Database connection error:" + err);
				reject(err);
			});
	});
};

// app.start = (PORT, MONGO_URL) => {
// 	return new Promise((resolve, reject) => {
// 		mongoose
// 			.connect(MONGO_URL, { useNewUrlParser: true })
// 			.then(() => {
// 				debug(MONGO_URL + ' database connect success');
// 				return seedData();
// 			})
// 			.then((seedResults) => {
// 				console.log('Any data seeded?', seedResults);
// 				server.listen(PORT, (err) => {
// 					if (err) {
// 						return reject(err);
// 					}
// 					console.log('App started and listening on port', PORT);
// 					resolve(server);
// 				});
// 			})
// 			.catch((err) => {
// 				debug('Database connection error:' + err);
// 				reject(err);
// 			});
// 	});
// };

module.exports = app;
