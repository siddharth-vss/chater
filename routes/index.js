const express = require('express');
const router = express.Router();

const USERS = require('../models/user');
const CHATS = require('../models/chatModel');
const MASSEGES = require('../models/messageModel');

/* GET home page. */
router.get('/', async(req, res) => {
  let userId = await USERS.find({}) ;
  res.send(userId);
});



module.exports = router;
