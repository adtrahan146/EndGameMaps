var express = require('express');
var router = express.Router();
var cors = require('cors');
const {test, sendHomepage, 
    sendNavbar, sendMapview, 
    sendLoginMenu, sendCreateAccountMenu,
    sendPinSort,
    sendPinManage,
    sendPinCreate,
    sendPinFind,
    postPinCreate,
    sendAllPinsToClient} = require('../controllers/server.controllers.js');

router.get('/test', test);
//todo
router.get('/account/');
router.get('/account/');

router.get('/login/loginSubmit');
router.get('/login/createAccount');

//Need to run profanity filter thru any POSTs
router.post('/mapMenu/pinCreate', postPinCreate);

router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');

//views
router.get('/views/homepage', sendHomepage);
router.get('/views/mapview', sendMapview);
router.get('/views/navbar', sendNavbar);
router.get('/views/loginMenu', sendLoginMenu);
router.get('/views/createAccountMenu', sendCreateAccountMenu);
router.get('/views/sort', sendPinSort);
router.get('/views/find', sendPinFind);
router.get('/views/pinCreate', sendPinCreate);
router.get('/views/pinManage', sendPinManage);
router.get('/mapView/generatePins', sendAllPinsToClient);


module.exports = router;