const mongoose = require('mongoose');


const transferQoutaSale = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    license:{
        type: String,
        required: true
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
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
    qoutaSale:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QoutaSales'
    }, 
    isChecked:{
        type: Boolean,
        default: false
    }
})

const TransferQoutaSale = mongoose.model("TransferQoutaSale", transferQoutaSale);

module.exports = TransferQoutaSale;