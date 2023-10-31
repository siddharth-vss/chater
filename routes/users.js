const express = require('express');
const router = express.Router();
const {auth } = require('../middleware/auth')
const { reg,log } = require('../middleware/midauth')
const {notFound,internal} = require('../middleware/error');
const {register, login , update ,get , allUsers} = require('../controller/auth');

/* GET home page. */
router.route('/').post(reg,register).get(auth,allUsers)

router.route('/login').post(log,login)
router.route('*').get(notFound);



module.exports = router;
