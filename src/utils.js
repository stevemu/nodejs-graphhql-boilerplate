const jwt = require('jsonwebtoken')

function getUserId(token, secret) {
  const { userId } = jwt.verify(token, secret);
  return userId
}

module.exports = {
  getUserId
}