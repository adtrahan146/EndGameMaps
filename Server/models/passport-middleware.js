const passport = require('passport');
const {Strategy} = require('passport-local');
const bcrypt = require('bcrypt');
const data = require('../models/data');

async function authenticateUser(email, password, done){
    const user = data.findOne({email});
    let isPW;
    // try {
    //     //isPW = password === user.password
    //     isPW = await bcrypt.compare(password, user.password);
    //     console.log(`provided PW: ${password}, actualPW: ${user.password}, bool: ${isPW}`);

    // } catch (error) {
    //     console.log('no user');
    // }
    isPW = await bcrypt.compare(password, user.password);
    if(!user){
        return done(null, false, { message: 'User not found' });
    }
    if(isPW){
        return done(null, user, {status: 200});
    }
    else{
        return done(null, false, {message: 'Incorrect password'});
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