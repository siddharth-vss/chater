const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB);


let user = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true },
    pic: { type: String,  default: " https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_149071&psig=AOvVaw1Lsgi8sH5qvowNKttxo1Hm&ust=1698754159538000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCMiRsMbenYIDFQAAAAAdAAAAABAE" },
}, { timestamps: true, })


module.exports = mongoose.model('User', user);