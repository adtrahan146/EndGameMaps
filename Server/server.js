const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const routes = require('./routes/routes.js');

const app = express();
const port = 3000 || process.env.port;

setup();
start();


function setup(){
    app.use(express.static(path.join(__dirname, '/public')));
    // app.use(express.static(path.join(__dirname, '/views')));
    
    app.use(localhostHandler);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.set("views", path.join(__dirname, "/views"));
    app.set('view engine', 'ejs');

    app.use('/scripts', express.static(__dirname + '/node_modules'));
    app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

    app.use('/', routes);

    // app.set('views', './views');
}

function start(){
    app.listen(port, () => console.log(`server is running port on port ${port}`) );
}


//User defined middleware

function localhostHandler(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    next();
}