const express = require('express');
const router = express.Router();


const MASSEGES = require('../models/messageModel');

/* GET home page. */
router.get('/', async(req, res) => {
  let userId = await MASSEGES.find({}) ;
  res.send(userId);
});



module.exports = router;
