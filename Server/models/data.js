const BASE_URL = `http://localhost:3000`;
const bcrypt = require('bcrypt');
const shortid = require('shortid');

class ServerData{
    //pin data model:
    //pinName: "pinName",
    //pinLocation: "lat,lng",
    //pinCategory: "categories,..,",
    //comments: "comments"

    constructor(){
        this.allPins = [{
            pinName: 'asd',
            pinLocation: '30.002442608871497,-90.08084345065278',
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

    async addUser(name, email, password){
        const id = shortid.generate();
        const hashedPassword = await bcrypt.hash( password , 10 ); 
        const user = {id:id, name:name, email:email, password:hashedPassword};
        this.users.push(user);
        console.log(this.users);
    }

    findUser( key , value ){
        const user = this.users.find( item => item [ key ] === value );
        return user;
    } 
}

module.exports = new ServerData();