const path = require('path');
const data = require('../models/data');
const passport = require('../models/passport-middleware');

class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
        console.log(`test json sent`);
    }

    sendHomepage(req, res){
        res.render('homepage');
        //can use this to send data w/homepage: { name: req.user.name }
        console.log(req.session.id);
    }

    sendNavbar(req, res){
        res.render(`navbar`);
        console.log('navbar sent');
    }

    sendMapview(req, res){
        res.render(`mapView`);
    }

    sendLoginMenu(req, res){
        console.log(req.session.id);
        res.render(`loginMenu`);
    }

    sendCreateAccountMenu(req, res){
        console.log(req.session.id);
        res.render(`createAccountMenu`);
    }

    sendPinSort(req, res){
        res.render(`sort`);
    }
    sendPinFind(req, res){
        res.render(`find`);
    }
    sendPinCreate(req, res){
        res.render(`pinCreate`);
    }
    sendPinManage(req, res){
        res.render(`pinManage`);
    }
    //Handling user login
    // app.post("/login", passport.authenticate("local", {
    //     successRedirect: "/secret",
    //     failureRedirect: "/login"
    // }), function (req, res) {
    // });

    postPinCreate(req, res, next){
        console.log("--->",req.body);
        const pinToAdd = req.body;
        data.addToPins(pinToAdd);
        res.end();
    }
    
    sendAllPinsToClient(req, res){
        const pins = data.getAllPins();
        res.json(pins);
    }


    
    //ACCOUNT
    //LOGIN
    postLogin(req, res, next){
        const config = {};
        config.successRedirect = '/views/homepage';
        config.failureRedirect = '/views/loginMenu';
        config.failureFlash = true;
        const authHandler = passport.authenticate( 'local' , config );
        authHandler(req, res, next); 
    }
    //register
    postRegister(req, res){
        try {  
            const {name, email, password} = req.body;
            data.addUser(name, email, password);
            res.status(200).send();
        } catch (error) {
            res.status(400).send();
        }
    }
}

module.exports = new ServerControllers();