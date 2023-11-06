const express = require('express');
const router = express.Router();


const { getMessages ,sendMessages} = require('../controller/messages');
const {auth} = require('../middleware/auth');
// const MASSEGES = require('../models/messageModel');
// const USER = require('../models/user');

/* GET home page. */
router.route('/').post(auth,sendMessages)
router.route('/:chatId').get(auth,getMessages);


module.exports = router;
