const BASE_URL = `http://localhost:3000`;
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const Pin = require('./Pin');
const User = require('./userSchema');

//Holds methods for contacting mongodb and for dev purposes holds the DB data

class ServerData{
    //pin data model:
    //pinName: "pinName",
    //pinLocation: "lat,lng",
    //pinCategory: "categories,..,",
    //comments: "comments"

    async getAllPins(){
        const list = await Pin.find({});
        return list;
    }

    addToPins = async function(pinToAdd, req, res){
        //adds pin from POST req at /mapMenu/pinCreate
        try {
            console.log(pinToAdd)
            await pinToAdd.save();
            // res.json({success: true});
        } catch (error) {
            // res.status(400).send("Failed saving to DB Error")
        }
    }
    
}

module.exports = new ServerData();