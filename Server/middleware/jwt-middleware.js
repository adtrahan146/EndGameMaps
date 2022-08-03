const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){

    if(!req.headers.authorization){
        return res.status(401).json({msg: 'Unauthorized request.'});
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).json({msg: 'Unauthorized request.'});
    }
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(401).json({msg: 'Unauthorized request.'});
    }
    
    //The payload subject is the user's mongo given _id value
    console.log(payload.subject);

    req.userId = payload.subject;
    next();
}

function checkForToken(req, res, next){

    if(!req.headers.authorization){
        return next();
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return next();
    }
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(400).render(`homepage`, {msg:"ln39catch"});
    }
    if(!payload){
        return next();
    }
    
    //The payload subject is the user's mongo given _id value
    console.log(payload.subject);

    // if(payload == undefined){
    //     return next();
    // }
    req.userId = payload.subject;
    next();
}

module.exports = {verifyToken, checkForToken};