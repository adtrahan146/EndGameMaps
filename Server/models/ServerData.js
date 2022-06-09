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

    addToPins = async function(pinToAdd, docs){
        //adds pin from POST req at /mapMenu/pinCreate
        try {
            console.log(pinToAdd)
            await pinToAdd.save(function(err, id){
                //id._id returns the newly created _id val of the pin
                let newId = id._id;
                console.log(id)
                User.updateOne({_id: docs._id}, {$push: {pins: [newId]}}).exec();
            });
        } catch (error) {
            //handle error
            console.log('error at 34 data')
        }
    }

    async findUserByToken(token){
        try {
            const docs = await User.findOne({'_id': token}).exec();
            if(docs){
                return docs;
            }else{
                return;
            }
        } catch (error) {
            //handle   
        }
    }
}

module.exports = new ServerData();