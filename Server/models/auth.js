exports.checkAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/views/homepage');
}

exports.checkNotAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/views/homepage');
    }
    next();
}