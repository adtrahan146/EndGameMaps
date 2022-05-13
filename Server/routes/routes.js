var express = require('express');
var router = express.Router();
const {test, sendHomepage, sendNavbar, sendMapview} = require('../controllers/server.controllers.js');


router.get('/test', test);
//todo
router.get('/account/');
router.get('/account/');
router.get('/account/');

router.get('/login/loginSubmit');
router.get('/login/createAccount');

router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');

//complete
router.get('/views/homepage', sendHomepage);
router.get('/views/mapview', sendMapview);
router.get('/views/navbar', sendNavbar);

module.exports = router;