const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || 'supersecuresecret';

// makes a token for the user
// attaches it to the user
function makeToken(payload) {
  // console.log('HIIII')
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      (err, data) => err ? reject(err) : resolve(data)
    )
  });
}

// will verify the user by token.
// If the token is the same it will accept
// if it is not familiar it will reject the user
function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      (err, data) => err ? reject(err) : resolve(data)
    )
  });
}

module.exports = {
  makeToken,
  verify
}
