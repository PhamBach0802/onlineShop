var express = require('express');
var router = express.Router();

require('./categories')(router);
require('./users')(router);
require('./dashboard')(router);
require('./products')(router);


module.exports = router;
