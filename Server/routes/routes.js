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
    sendAllPinsToClient,
    postLogin, postRegister} = require('../controllers/server.controllers.js');
const {checkAuthenticated, checkNotAuthenticated} = require('../models/auth');

router.get('/test', test);
//todo
// router.post('/account/register', postRegister);
// router.post('/account/login', postLogin);
 
router.post('/login/loginSubmit', checkNotAuthenticated, postLogin);
router.post('/login/createAccount', checkNotAuthenticated, postRegister);

//Need to run profanity filter thru any POSTs
router.post('/mapMenu/pinCreate', postPinCreate);

router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');

//views
router.get('/views/homepage', sendHomepage);
router.get('/views/mapview', sendMapview);
router.get('/views/navbar', sendNavbar);
router.get('/views/loginMenu', checkNotAuthenticated, sendLoginMenu);
router.get('/views/createAccountMenu', checkNotAuthenticated, sendCreateAccountMenu);
router.get('/views/sort', sendPinSort);
router.get('/views/find', sendPinFind);
router.get('/views/pinCreate', checkNotAuthenticated, sendPinCreate);
router.get('/views/pinManage', checkNotAuthenticated, sendPinManage);
router.get('/mapView/generatePins', checkNotAuthenticated, sendAllPinsToClient);


module.exports = router;