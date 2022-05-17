const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('express-flash');
// const dotenv = require('dotenv');
const passport = require('./models/passport-middleware');
const routes = require('./routes/routes.js');

const app = express();
const port = 3000 || process.env.port;

setup();
start();


function setup(){
    app.set('view engine', 'ejs');
    app.set("views", path.join(__dirname, "/views"));

    app.use(express.static(path.join(__dirname, '/public')));
    // app.use(express.static(path.join(__dirname, '/views')));
    app.use(cors({
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        allowedHeaders: '*',
        origin: '*'
    }));
    app.options('*', cors());
    // app.use(localhostHandler);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    const sessionConfig = { secret: 'secret-word' , resave: false , saveUninitialized: true };
    app.use(session(sessionConfig));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', routes);
    app.use('/scripts', express.static(__dirname + '/node_modules'));
    app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
    app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
    app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

    

}

function start(){
    app.listen(port, () => console.log(`server is running port on port ${port}`) );
}


//User defined middleware

// function localhostHandler(request, response, next){
//     response.header('Access-Control-Allow-Origin', '*');
//     next();
// }