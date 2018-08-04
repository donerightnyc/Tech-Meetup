const db = require('../config/connection');

function create(like) {
  //the if statement is for users who logged in
  //if the users are not logged in they cannot create

  return db.one(`
    INSERT INTO likes (events_id, liker_id)
    VALUES ($/events_id/, $/liker_id/)
    RETURNING *
    `, like);
}

function destroy(id) {
  return db.none(`
    DELETE FROM likes WHERE id = $1
    `, id);
}

function getAll() {
  return db.any(`
    SELECT * FROM likes
    `);
}

function getOne(id) {
  return db.one(`
    SELECT * FROM likes
    WHERE id = $1
    `, id);
}

module.exports = {
  create,
  destroy,
  getAll,
  getOne
}
