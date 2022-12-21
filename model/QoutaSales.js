const mongoose = require('mongoose');


const quotaSalesSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    number:{
        type: String,
        default: "0"
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    weight:{
        type: Number,
        required: true
    },
    issued:{
        type: Number,
        default: "0"
    },
    rentStatus:{
        type: Boolean,
        required: true
    },
    rentPrice:{
        type: Number,
        default: 0
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }
})

const QoutaSales = mongoose.model("QoutaSales", quotaSalesSchema);

module.exports = QoutaSales;