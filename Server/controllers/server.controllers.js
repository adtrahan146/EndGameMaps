const jwt = require('jsonwebtoken');
const data = require('../models/ServerData');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const Pin = require('../models/Pin');
//add to env:
const saltRounds = 10;
//

class ServerControllers{

    async sendHomepage(req, res){
        let user;

        if(req.userId){
            user = await User.findOne( {_id: req.userId} ).exec();
            user = user.username;
            console.log(user)
        }else{
            res.render('homepage', {loggedIn: false});
            return;
        }
        res.render('homepage', {username: user, loggedIn: true});

        //console.log(req.session.token);
    }

    async sendNavbar(req, res){
        let user;

        if(req.userId){
            user = await User.findOne( {_id: req.userId} ).exec();
            user = user.username;
            res.render(`navbar`, {username: user, loggedIn: true});
            // console.log(user)
        }else{
            res.render('navbar', {loggedIn: false});
        }
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
    async sendPinCreate(req, res){
        //after middleware, req should have user data if available

        let user;

        if(req.userId){
            user = await User.findOne( {_id: req.userId} ).exec();
            user = user.username;
            // console.log(user)
        }else{
            res.render('pinCreate', {loggedIn: false});
            return;
        }
        res.render('pinCreate', {username: user, loggedIn: true});
    }

    async sendPinManage(req, res){
        let user;
        if(req.userId){
            user = await User.findOne( {_id: req.userId} ).exec();
            user = user.username;
            console.log(user)
        }else{
            res.render(`pinManage`, {loggedIn: false});
            return;
        }
        res.render(`pinManage`, {username: user, loggedIn: true});
    }


    async postPinCreate(req, res, next){
        let pinToAdd = new Pin(req.body);
        const userToken = req.userId;
        const docs = await data.findUserByToken(userToken);
        if(docs){
            pinToAdd.username = docs.username;
            await data.addToPins(pinToAdd, docs);
            res.status(200).json({msg: "Success"});
        }else{
            res.status(400).json({msg: "Error looking up your account for pin creation"});
        }
    }
    
    async sendAllPinsToClient(req, res){
        const pins = await data.getAllPins();
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
        let {name, email, username, password} = req.body;                                     //user fields from req body
        password = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name: name, email: email, username: username, password: password });         //create new user instance
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