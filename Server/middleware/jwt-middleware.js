const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){

    if(!req.headers.authorization){
        return res.status(401).json({msg: 'Unauthorized request.'});
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).json({msg: 'Unauthorized request.'});
    }
    const payload = jwt.verify(token, 'xela123');
    if(!payload){
        console.log('3')

        return res.status(401).json({msg: 'Unauthorized request.'});
    }
    req.userId = payload.subject;
    next();
}

module.exports = {verifyToken};