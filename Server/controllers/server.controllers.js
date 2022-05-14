var path = require('path');

class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
        console.log(`test json sent`);
    }

    sendHomepage(req, res){
        // res.sendFile(path.resolve('views/homepage.html'));
        res.render('homepage');
        console.log(`homepage sent`);
    }

    sendNavbar(req, res){
        res.render(`navbar`);
        console.log('navbar sent');
    }

    sendMapview(req, res){
        res.render(`mapView`);
    }

}

module.exports = new ServerControllers();