const express = require('express');
const router = express.Router();
const {test, sendHomepage, 
    sendNavbar, sendMapview, 
    sendLoginMenu, sendCreateAccountMenu,
    sendPinSort,
    sendPinManage,
    sendPinCreate,
    sendPinFind,
    postPinCreate,
    sendAllPinsToClient,
    postLogin, postRegister,
    getuserGET, userGET, updateuserPUT,
    deleteuserDELETE,
    specialGET} = require('../controllers/server.controllers.js');
const User = require('../models/userSchema.js');
const {verifyToken} = require('../middleware/jwt-middleware')


router.get('/test', test);
//todo
 
router.post('/login/loginSubmit', postLogin);
router.post('/login/createAccount', postRegister);

// router.put('/update/:id', updateuserPUT);

// router.delete('/delete/:id', deleteuserDELETE);


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

router.get('/views/pinCreate', verifyToken, sendPinCreate);

router.get('/views/pinManage', sendPinManage);
router.get('/mapView/generatePins', sendAllPinsToClient);

module.exports = router;