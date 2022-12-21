const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true
    },
    nationalCode:{
        type: String,
        default: "0"
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 255
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;