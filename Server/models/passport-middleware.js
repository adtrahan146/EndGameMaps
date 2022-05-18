const {Strategy} = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const data = require('../models/data');

async function authenticateUser(email, password, done){
    const user = data.findUser('email', email);
    let isPW;
    try {
        //isPW = password === user.password
        isPW = await bcrypt.compare(password, user.password);
        console.log(`provided PW: ${password}, actualPW: ${user.password}, bool: ${isPW}`);

    } catch (error) {
        console.log(error);
    }

    if (user === undefined){
        return done(null, false, {message: "No user with that email"});
    }
    if(isPW){
        return done(null, user);
    }
    else {
        console.log(`provided PW: ${password}, actualPW: ${user.password}, bool: ${isPW}`);
        return done(null, false, {message: "Password incorrect"});
    }
}

function setupPassport(){
    const formNames = {usernameField: 'email', passwordField: "password"};
    const localStrategy = new Strategy(formNames, authenticateUser);
    passport.use(localStrategy);
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser( (id, done) => done(null, data.findUser('id', id)));
}

setupPassport();
module.exports = passport;