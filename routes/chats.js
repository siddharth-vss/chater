const express = require('express');
const router = express.Router();


const CHATS = require('../models/chatModel');

/* GET home page. */
router.get('/', async(req, res) => {
  let userId = await CHATS.find({}) ;
  res.send(userId);
});



module.exports = router;
