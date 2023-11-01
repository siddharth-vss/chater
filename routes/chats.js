const express = require('express');
const router = express.Router();
const {auth } = require('../middleware/auth')
const {notFound} = require('../middleware/error');
const { accessChat , fetchChat , createGroupChat , renameGroup , removeFromGroup , addToGroup  } = require('../controller/chat');

const CHATS = require('../models/chatModel');

/* GET home page. */
router.route('/').post(auth,accessChat).get(auth,fetchChat);
router.route('/group').post(auth,createGroupChat);
router.route('/rename').put(auth,renameGroup);
router.route('/groupremove').put(auth,removeFromGroup);
router.route('/groupadd').put(auth,addToGroup);
router.route('*').get(notFound);

module.exports = router;
