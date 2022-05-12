var path = require('path');

class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
    }

    sendHomepage(req, res){
        res.sendFile(path.resolve('views/homepage.html'));
    }

}

module.exports = new ServerControllers();