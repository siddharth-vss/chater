const  jwt = require('jsonwebtoken');



const auth = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(400).send('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.SECREATE);
    req.user = payload.id;
   
    next();
  } catch (error) {
    res.status(400).send('Authentication invalid');
  }
};
  module.exports = {auth};