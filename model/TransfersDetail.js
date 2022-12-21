const mongoose = require("mongoose");

const transferDetailSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    sourceWeight:{
        type: Number,
        required: true
    },
    destinationWeight:{
        type: Number,
        required: true
    },
    weightNumber:{
        type: String,
        required: true
    },
    driver:{
        type: String,
        required: true
    },
    numberTruck:{
        type: String,
        required: true
    },
    rentState:{
        type: Boolean,
        default: false
    },
    transferId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfers'
    }, 
})

const TransfersDetail = mongoose.model("TransfersDetail", transferDetailSchema);

module.exports = TransfersDetail;