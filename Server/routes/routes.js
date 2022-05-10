var express = require('express');
var router = express.Router();
const {test} = require('../controllers/server.controllers.js');


router.get('/test', test);


module.exports = router;