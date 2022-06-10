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

    async findUsersPins(user){
        try {
            let pins = [];
            for(let i=0; i<user.pins.length; i++){
                let pin = await Pin.findById(user.pins[i]);
                pins.push(pin);
            }
            return pins;
        } catch (error) {
            console.log('error finding users pins ln59')
            return ['<h4>No pins created yet!</h4>'];
        }
    }

    async findRandomPin(){
        try {
            let randomPin = await Pin.aggregate([{$sample: {size: 1}}]);
            return randomPin;
        } catch (error) {
            console.log('error finding random pin ln68');
            return;
        }
    }
}

module.exports = new ServerData();