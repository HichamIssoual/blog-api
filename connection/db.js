const mongooose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGO_URI;
module.exports = async ()=>{
    try {
       await mongooose.connect(mongoUri);
        console.log("your are connected with mongo db ^_^",);
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}