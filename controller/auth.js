const USERS = require('../models/user');
const jwt = require('jsonwebtoken');

let bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();

const ind = [".fgrt.werw", ".cat/ewe", ".srtrr_rery", ".terrwe.erwer", ".eryew+reye.wer", ".ererg-wertgr", ".ferergerg", ".jewbfkobpj", ".kqjdgqheweekhoikjn", ".qerihgq[ebpmi];jkqerfb"]


const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    let salt = await bcrypt.genSalt(10);
    let npr = Math.floor((Math.random() * 9) + 1);
    let ext = ind[npr];

    let { name, email, password, pic, mobile } = req.body;
console.log(req.body);
    let user = await USERS.findOne({ email });
    let hash = await bcrypt.hash(password, salt);
    try {
        if (user) {
            res.send('ERROR');
        }

        if (!user) {
            let user = await USERS.create({
                name: name,
                email: email,
                mobile: mobile,
                pic: pic,
                password: hash,
                source: " from " + password + ext
            })
            let id = user._id;
            let token = jwt.sign({ id }, process.env.SECREATE);
            res.status(201).json({
                name,
                email,
                _id,
                password,
                pic,
                token
              });
        }
    } catch (err) {
        console.log("error =>", err);
        res.status(500).send("Internal Server Error");
    }

}

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  console.log(req.body)
    const { email, password } = req.body;


    try {

        let user = await USERS.findOne({ email });
        let id = user._id;
        let token = await jwt.sign({ id }, process.env.SECREATE, { expiresIn: '1d' });

        if (!user) {

            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        let compare = await bcrypt.compare(password, user.password);



        if (compare) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: token,
              } );

        }
        else {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


}
const update = async (req, res) => {
    let userId = await USERS.find({});
    res.send(userId);
}
const get = async (req, res) => {

    res.render('index', { title: "USERS" })
}
const allUsers = async (req, res) => {
  const keyword = req.query.search ? {
    $or: [
        { name: {$regex: req.query.search, $options:"i" } },
        { email: {$regex: req.query.search, $options:"i" } },
    ]
  }:{};
  console.log(req.user)
  let users = await USERS.find(keyword).find({_id:{$ne:req.user}});
    res.send(users);
    console.log(users);

}

module.exports = { register, login, update, get , allUsers};