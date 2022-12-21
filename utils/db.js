const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/wheat";


const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(uri);

        console.log(`Mongo connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;