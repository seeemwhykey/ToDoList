const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, config.JWT_KEY);
    console.log(decoded);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
    message: 'Authentifizierung fehlgeschlagen'
    })
  }
};
