let { body } = require("express-validator");


let log = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
];

let reg = [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('mobile', 'Mobile number must be atleast 10 characters').isLength({ min: 10 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
];


module.exports = { reg, log };