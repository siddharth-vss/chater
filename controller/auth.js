const USERS = require('../models/user');

const register = async (req, res) => {

    let { name, email, password, pic , mobile } = req.body;

    let user = await USERS.findOne({ email });

    if (user) {
        res.send('ERROR');
    }

    if (!user) {
        let user = await USERS.create({
            name: name ,
            email: email  ,
            password: password  ,
            mobile :mobile,
            pic: pic
        })

        res.json(user);
    }
}
const login = async (req, res) => {
    let userId = await USERS.find({});
    res.send(userId);
}
const update = async (req, res) => {
    let userId = await USERS.find({});
    res.send(userId);
}
const get = async (req, res) => {
    let user = await USERS.find({});
    res.render('index', { title: "USERS" })
}

module.exports = { register, login, update, get };