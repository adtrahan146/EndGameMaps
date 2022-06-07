const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./middleware/passport-middleware');
const routes = require('./routes/routes.js');

const app = express();
const port = 3000 || process.env.port;
const {database} = require('./models/database');
const mongoose = require('mongoose');
const mongoose_config = {useNewUrlParser: true, useUnifiedTopology: true};
const connection = mongoose.connect(database, mongoose_config);

setup();
start();


function setup(){
    //DB stuff
    if(connection){
        console.log('success');
    }else{
        console.log('eror');
    }

    //setups
    app.set('view engine', 'ejs');
    app.set("views", path.join(__dirname, "/views"));
    app.use(cors({
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        allowedHeaders: '*',
        origin: '*'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, '/public')));

    app.use('/', routes);
    app.use('/scripts', express.static(__dirname + '/node_modules'));
    app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
    app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
    app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

    

}

function start(){
    app.listen(port, () => console.log(`server is running port on port ${port}`) );
}