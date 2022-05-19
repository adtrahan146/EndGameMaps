const BASE_URL = `http://localhost:3000`;
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const Pin = require('../models/Pin');


//Holds methods for contacting mongodb and for dev purposes holds the DB data

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
    }

    async getAllPins(){
        const list = await Pin.find({});
        console.log(list)
        return list;
    }

    addToPins = async function(pinToAdd, req, res){
        //adds pin from POST req at /mapMenu/pinCreate
        try {
            await pinToAdd.save();
            // res.json({success: true});
        } catch (error) {
            // res.status(400).send("Failed saving to DB Error")
        }
    }

    // async addUser(name, email, password){
    //     const id = shortid.generate();
    //     const hashedPassword = await bcrypt.hash( password , 10 ); 
    //     const user = {id:id, name:name, email:email, password:hashedPassword};
    //     this.users.push(user);
    //     console.log(this.users);
    // }

    // findUser( key , value ){
    //     const user = this.users.find( item => item [ key ] === value );
    //     return user;
    // } 
    
}

module.exports = new ServerData();