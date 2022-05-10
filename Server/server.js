const express = require('express');
const path = require('path');
// const expressLayouts = require

const app = express();
const port = 3000 || process.env.port;


setupMiddleware();
setupEndpoints();
start();


function setupMiddleware(){
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/views')));

    app.use('/scripts', express.static(__dirname + '/node_modules'));

    app.set('views', './views');
    app.set('view engine', 'ejs');
}


function setupEndpoints(){
    app.get("/", getHomepage);
    app.get('/account/createAccountMenu/', getCreateAccountMenu);
}


function start(){
    app.listen(port, () => console.log("server is running port ", port) );
}




function getHomepage(req, res){
    res.sendFile('/views/homepage.ejs', {root: __dirname});
}

function getMapView(req, res){
    res.render('mapView', {root: __dirname});
}

function getCreateAccountMenu(req, res){
    res.render('createAccountMenu', {root: __dirname});
}