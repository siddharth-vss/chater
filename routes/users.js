const express = require('express');
const router = express.Router();

const {register, login , update ,get} = require('../controller/auth');

/* GET home page. */
router.route('/').post(register)
router.route('/').get(get)
router.route('/login').get(get)



module.exports = router;
