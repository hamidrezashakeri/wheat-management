const mongoose = require('mongoose');


const storeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false
    }
})

storeSchema.index({'$**': 'text'});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;

