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
const {verifyToken, checkForToken} = require('../middleware/jwt-middleware')

//todo
 
router.post('/login/loginSubmit', postLogin);
router.post('/login/createAccount', postRegister);

// router.put('/update/:id', updateuserPUT);

// router.delete('/delete/:id', deleteuserDELETE);


//Need to run profanity filter thru any POSTs
router.post('/mapMenu/pinCreate', verifyToken, postPinCreate);

router.get('/mapMenu/manage/:pinID');
router.get('/mapMenu/manage/:pinID');

//views
router.get('/views/homepage', checkForToken, sendHomepage);
router.get('/views/mapview', checkForToken, sendMapview);
router.get('/views/navbar', checkForToken, sendNavbar);
router.get('/views/loginMenu', sendLoginMenu);
router.get('/views/createAccountMenu', checkForToken, sendCreateAccountMenu);
router.get('/views/sort', verifyToken, sendPinSort);
router.get('/views/find', checkForToken, sendPinFind);

router.get('/views/pinCreate', checkForToken, sendPinCreate);

router.get('/views/pinManage', checkForToken, sendPinManage);

router.get('/mapView/generatePins', sendAllPinsToClient);

module.exports = router;