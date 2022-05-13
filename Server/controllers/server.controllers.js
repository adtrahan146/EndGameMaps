var path = require('path');

class ServerControllers{
    
    test(req, res){
        res.json({'success': true});
        console.log(`test json sent`);
    }

    sendHomepage(req, res){
        res.sendFile(path.resolve('views/homepage.html'));
        // res.render('/views/homepage');
        console.log(`homepage sent`);
    }

    sendNavbar(req, res){
        res.sendFile(path.resolve(`views/navbar.html`));
        console.log('navbar sent');
    }

    sendMapview(req, res){
        res.sendFile(path.resolve(`views/mapView.html`));
    }

}

module.exports = new ServerControllers();