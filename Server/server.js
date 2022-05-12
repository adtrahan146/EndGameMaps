const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

const app = express();
const port = 3000 || process.env.port;

setup();
start();


function setup(){
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/views')));
    
    app.use(localhostHandler);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/scripts', express.static(__dirname + '/node_modules'));
    app.use('/', routes);

    // app.set('views', './views');
}

function start(){
    app.listen(port, () => console.log("server is running port ", port) );
}


//User defined middleware

function localhostHandler(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    next();
}