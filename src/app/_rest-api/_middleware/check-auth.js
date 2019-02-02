const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.userData = decoed;
    next();
  } catch (error) {
    return res.status(401).json({
    message: 'Authentifizierung fehlgeschlagen'
    })
  }
    next();
};
