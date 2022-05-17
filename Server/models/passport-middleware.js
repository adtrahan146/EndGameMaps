const {Strategy} = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const data = require('../models/data');

async function authenticateUser(email, password, done){
    const user = data.findUser('email', email);

    if ( user === undefined){
        console.log ( "No user with that email" );
        return done ();
    }
    if ( password === user . password ){
        console.log ( "User Authenticated" );
        return done ();
    }
    else {
        console.log ( "Password incorrect" );
        return done ();
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