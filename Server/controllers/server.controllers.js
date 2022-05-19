const path = require('path');
const jwt = require('jsonwebtoken');
const data = require('../models/data');
const passport = require('../models/passport-middleware');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const Pin = require('../models/Pin');
const accessTokenSecret = 'xela123';
const saltRounds = 10;


class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
        console.log(`test json sent`);
    }

    sendHomepage(req, res){
        res.render('homepage');
        //can use this to send data w/homepage: { name: req.user.name }
        console.log(req.session.token);
    }

    sendNavbar(req, res){
        res.render(`navbar`);
        console.log('navbar sent');
        console.log(req.session.token);

    }

    sendMapview(req, res){
        console.log(req.session.token);

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

    async postPinCreate(req, res, next){
        var pinToAdd = new Pin(req.body);
        await data.addToPins(pinToAdd);
    }
    
    async sendAllPinsToClient(req, res){
        const pins = await data.getAllPins();
        console.log(pins)
        res.json(pins);
    }


    
    //ACCOUNT
    //LOGIN
    async postLogin(request, response){
        const userData = request.body; //get data from request body
        const user = await User.findOne( {email: userData.email} ).exec(); //findOne execs to DB, gets user
        let isPW;
        isPW = await bcrypt.compare(user.password, userData.password);

        console.log(isPW)
        if(!user){ //wrong email, send err message
            response.status(401).json( {msg:'Invalid email'} )
        }
        else if(!isPW){ //wrong pword, send err message
            response.status(401).json( {msg:'Invalid password'} )
        }
        else{
            const payload = {subject: user._id} //define JWT payload as user id
            const token = jwt.sign(payload,accessTokenSecret, {expiresIn: "1h"}) //hash token = payload + secret
            response.status(200).json( {token} ) //send token back to client
        }
    }

    //register
    async postRegister(req, res){ 
        let {name, email, password} = req.body;                                     //user fields from req body
        console.log(req.body)
        password = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name: name, email: email, password: password });         //create new user instance
        const user = await newUser.save()                                   //schema's save() into db
        const json = {success: true, msg: "data inserted", user: user }   //results as json
        res.json(json);
    }
    async getuserGET(request, response) { //callback fxn for READ ALL
        const documents = await User.find();       //find() gets all Users in DB
        const json = {status:200, msg:'Users data fetched', data: documents}; //results as json
        response.json(json);                        //send json with response
    }
    async userGET(request, response){
        let documents;
        try {
            documents = await User.findById(request.params.id);
            if(documents){
                response.status(200).json(documents);
            }
        }catch(error) {
            response.status(404).json({msg: 'data not found'});
        }
    }
    async updateuserPUT(request,response) { //callback fxn for UPDATE
        const user = { _id: request.params.id }; //id to find a user
        const data = { email: request.body.email, password: request.body.password } //data to update in user
        const document = await User.updateOne(user,data); //updateOne() syncs to DB
        if(!document){                                    //no user, 404 status
            return response.status(404).json({ msg: 'data not found' });
        }
        return response.status(200).json(document); //otherwise send as json
    }
    async deleteuserDELETE(request, response) { //callback for DELETE
        const document = await User.deleteOne({ _id: request.params.id }); //deleteOne() syncs to DB
        const json = { status: 200, msg: 'User data deleted', document: document } //results as json
        response.json(json); //send json with response
    }
        
    //Middleware function
    verifyToken( request, response, next ) {
        if ( !request.headers.authorization ){              //No authorization in header
            return response.status(401).json( {msg:'Unauthorized request'} )        //Send back with 401 status
        }
        const token = request.headers.authorization.split(' ')[1];                  //split token from header
        if ( token === null ){                                                 //No token
            return response.status(401).json( {msg:'Unauthorized request'} ) //Send back with 401 status
        }
        const payload = jwt.verify(token,accessTokenSecret) //Use JWT to verify Token
        if ( !payload ) { //Not valid
            return response.status(401).json( {msg:'Unauthorized request'} ) //Send back with 401 status
        }
        request.userId = payload.subject;        //Embed user id into request
        next();                                 //Invoke next fxn in chain
    }
    async specialGET(request,response){ //callback fxn for SPECIAL
        const data = {user: request.userId} //embed userID from payload into json
        response.json(data) //send json with response
    }
        
}

module.exports = new ServerControllers();