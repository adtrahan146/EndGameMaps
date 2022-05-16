const BASE_URL = `http://localhost:3000`;
const bcrypt = require('bcrypt');

class ServerData{
    //pin data model:
    //pinName: "pinName",
    //pinLocation: "lat,lng",
    //pinCategory: "categories,..,",
    //comments: "comments"

    constructor(){
        this.allPins = [{
            pinName: 'asd',
            pinLocation: '29.999097714782373,-90.09972323106469',
            pinCategory: null,
            comments: ''
          },
          {
            pinName: 'test!!!!!!!',
            pinLocation: '29.999097714782373,-90.09972323106423',
            pinCategory: null,
            comments: ''
          },
          {
            pinName: 'metairie',
            pinLocation: '29.988839336608084,-90.11756667836934',
            pinCategory: 'niche',
            comments: 'wow it works'
          }];
        this.users = [];
    }

    getAllPins(){
        return this.allPins;
    }

    addToPins = function(pinToAdd){
        //adds pin from POST req at /mapMenu/pinCreate
        this.allPins.push(pinToAdd);
        console.log(this.allPins);
    }
}

module.exports = new ServerData();