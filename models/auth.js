const db = require('../config/connection');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function register(cred) {
  console.log(cred)
  return bcrypt.hash(cred.pw_digest, saltRounds)
    .then(hash => {
      const newUser = {
        username: cred.username,
        email: cred.email,
        pw_digest: hash
      };
      return db.one(`
        INSERT INTO users (username, email, pw_digest)
        VALUES ($/username/, $/email/, $/pw_digest/)
        RETURNING id, email, username
      `, newUser)
    });
}


function findByEmail(email) {
  return db.one(`
    SELECT * FROM users
    WHERE email = $1
    `, email);
}

function login(cred) {
  return findByEmail(cred.email)
    .then(user => (
      // compare provided pw_digest(password) with pw_digest
      bcrypt.compare(cred.pw_digest, user.pw_digest)
      // match is a boolean if hashing the provided password
      // matches the hash password (True or False)
        .then(match => {
          if(!match) throw new Error('Credentials do not match');
          delete user.pw_digest;
          return user;
        })
      ))
}

module.exports = {
  register,
  login
};
