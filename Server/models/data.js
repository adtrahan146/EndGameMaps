const BASE_URL = `http://localhost:3000`;
const bcrypt = require('bcrypt');

class ServerData{
    //pin data model:
    //pinName: "pinName",
    //pinLocation: "lat,lng",
    //pinCategory: "categories,..,",
    //comments: "comments"

    constructor(){
        this.allPins = [];
        this.users = [];
    }

    getAllPins(){
        return this.allPins;
    }

    addToPins(){
        //adds pin from POST req at /mapMenu/pinCreate
    }
}

module.exports = ServerData;