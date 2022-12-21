const mongoose = require('mongoose');

const paymentsSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    bank:{
        type: String,
        required: true,
        trim: true
    },
    issued:{
        type: Number,
        default: 0
    },
})

paymentsSchema.index({"$**": "text"});

const Payments = mongoose.model("Payments", paymentsSchema);

module.exports = Payments;