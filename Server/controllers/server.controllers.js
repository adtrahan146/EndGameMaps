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

    //ACCOUNT
    //LOGIN
    sendLoginMenu(req, res){
        res.render(`loginMenu`);
    }

    sendCreateAccountMenu(req, res){
        res.render(`createAccountMenu`);
    }

    sendPinSort(req, res){
        res.render(`sort`);
    }
    sendPinFind(req, res){
        res.render(`find`);
    }
    sendPinCreate(req, res){
        res.render(`pinCreate`);
    }
    sendPinManage(req, res){
        res.render(`pinManage`);
    }
    //Handling user login
    // app.post("/login", passport.authenticate("local", {
    //     successRedirect: "/secret",
    //     failureRedirect: "/login"
    // }), function (req, res) {
    // });

}

module.exports = new ServerControllers();