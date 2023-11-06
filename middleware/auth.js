const cookieParser = require('cookie-parser');
const  jwt = require('jsonwebtoken');



const auth = async (req, res, next) => {

  // const jwttoken = req.cookies;
  // console.log(jwttoken)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(400).send('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.SECREATE);
    // console.log(payload)
    // attach the user request object

    req.user = payload.id;
    // console.log(req.user);
    // req.user = { userId: payload.userId };
    next();
  } catch (error) {
    res.status(400).send('Authentication invalid');
  }
};
  module.exports = {auth};