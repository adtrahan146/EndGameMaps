var express = require('express');
var router = express.Router();
const {test, sendHomepage, 
    sendNavbar, sendMapview, 
    sendLoginMenu, sendCreateAccountMenu,
    sendPinSort,
    sendPinManage,
    sendPinCreate,
    sendPinFind} = require('../controllers/server.controllers.js');


router.get('/test', test);
//todo
router.get('/account/');
router.get('/account/');

router.get('/login/loginSubmit');
router.get('/login/createAccount');

router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');

//views
router.get('/views/homepage', sendHomepage);
router.get('/views/mapview', sendMapview);
router.get('/views/navbar', sendNavbar);
router.get('/views/loginMenu', sendLoginMenu);
router.get('/views/createAccountMenu', sendCreateAccountMenu);
// router.get('/views/sort', sendPinSort);
// router.get('/views/find', sendPinFind);
// router.get('/views/create', sendPinCreate);
// router.get('/views/pinManage', sendPinManage);


module.exports = router;