const path = require('path');
const jwt = require('jsonwebtoken');
const data = require('../models/ServerData');
const passport = require('../middleware/passport-middleware');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const Pin = require('../models/Pin');
const saltRounds = 10;


class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
        console.log(`test json sent`);
    }

    sendHomepage(req, res){
        res.render('homepage');
        //can use this to send data w/homepage: { name: req.user.name }
        //console.log(req.session.token);
    }

    sendNavbar(req, res){
        res.render(`navbar`);
        console.log('navbar sent');
        //console.log(req.session.token);

    }

    sendMapview(req, res){
        //console.log(req.session.token);

        res.render(`mapView`);
    }

    sendLoginMenu(req, res){
        //console.log(req.session.id);
        res.render(`loginMenu`);
    }

    sendCreateAccountMenu(req, res){
        //console.log(req.session.id);
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
    

    async postPinCreate(req, res, next){
        var pinToAdd = new Pin(req.body);
        await data.addToPins(pinToAdd);
        res.json(pinToAdd);
    }
    
    async sendAllPinsToClient(req, res){
        const pins = await data.getAllPins();
        console.log(pins)
        res.json(pins);
    }


    
    //ACCOUNT
    //LOGIN
    async postLogin(request, response){
        let isPW, userData, user;
        try {
            userData = request.body; //get data from request body
            user = await User.findOne( {email: userData.email} ).exec(); //findOne execs to DB, gets user
            isPW = await bcrypt.compare(userData.password, user.password);
        } catch (error) {
            response.status(400).json({msg: 'No account found'});
            return;
        }

        if(!user){ //wrong email, send err message
            response.status(401).json( {msg:'Invalid email'} );
        }
        else if(!isPW){ //wrong pword, send err message
            response.status(401).json( {msg:'Invalid password'} );
        }
        else{
            const payload = {subject: user._id}; //define JWT payload as user id
            const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"}); //hash token = payload + secret
            response.status(200).json( {token} ); //send token back to client
        }
    }

    //register
    async postRegister(req, res){ 
        let {name, email, password} = req.body;                                     //user fields from req body
        password = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name: name, email: email, password: password });         //create new user instance
        const document = await newUser.save()                                   //schema's save() into db
        const json = {state: true, msg: "data inserted", document: document }   //results as json
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
}

module.exports = new ServerControllers();