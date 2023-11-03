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
    pic: { type: String,  default: "https://res.cloudinary.com/dabh5hsuk/image/upload/v1698927011/fvjydafhxp8jwfaxpqwy.webp" },
}, { timestamps: true, })


module.exports = mongoose.model('User', user);