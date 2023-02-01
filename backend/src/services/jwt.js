const jwt = require("jsonwebtoken");

// TODO: créer la fonction generateToken
function generateToken(admin) {
  const payload = {
    id: admin.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

// TODO: créer la fonction decodeToken
function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateToken,
  decodeToken,
};
