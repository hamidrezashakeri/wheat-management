const mongoose = require('mongoose');

const transfersSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    number:{
        type: String,
        default: ""
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    weight:{
        type: Number,
        required: true
    },
    issued:{
        type: Number,
        default: 0
    },
    rentStatus:{
        type: Boolean,
        default : false
    },
    rentPrice:{
        type: Number,
        default: 0
    }
})

const Transfers = mongoose.model("Transfers", transfersSchema);

module.exports = Transfers;