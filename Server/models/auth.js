exports.checkAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/views/loginMenu');
}

exports.checkNotAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/views/homepage');
    }
    next();
}