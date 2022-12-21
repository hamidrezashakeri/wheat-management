const mongoose = require('mongoose');

const buysDirectlySchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    weightNumber:{
        type: String,
        default: ""
    },
    driver:{
        type: String,
        default: ""
    },
    numberTruck:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    nationalCode:{
        type: String,
        required: true
    },
    rentRate:{
        type: Number,
        required: true
    },
    rentStatus:{
        type: Boolean,
        default: false
    }
})

const BuysDirectly = mongoose.model("BuysDirectly", buysDirectlySchema);

module.exports = BuysDirectly;