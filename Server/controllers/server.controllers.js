var path = require('path');

class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
        console.log(`test json sent`);
    }

    sendHomepage(req, res){
        res.sendFile(path.resolve('views/homepage.html'));
        console.log(`homepage sent`);
    }

}

module.exports = new ServerControllers();