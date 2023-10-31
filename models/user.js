const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB);


let user = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true },
    source: { type: String, required: true },
    mobile: { type: Number, required: true },
    pic: { type: String,  default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" },
}, { timestamps: true, })


module.exports = mongoose.model('User', user);