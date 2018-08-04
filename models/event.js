const db = require('../config/connection');

function getAll() {
  return db.any(`
    SELECT * FROM events
    `);
}

function getOne(id) {
  return db.one(`
    SELECT * FROM events
    WHERE id = $1
    `, id);
}

//create event
function create(events) {
  //the if statement is for users who logged in
  //if the users are not logged in they cannot create

  return db.one(`
    INSERT INTO events (event, text, img_url, user_id, location)
    VALUES ($/event/, $/text/, $/img_url/, $/user_id/, $/location/)
    RETURNING *
    `, events);
}

function destroy(id) {
  return db.none(`
    DELETE FROM events WHERE id = $1
    `, id);
}

function update(events) {
    return db.one(`
    UPDATE events
    SET event = $/event/, text = $/text/, img_url = $/img_url/, location = $/location/ 
    WHERE id = $/id/
    RETURNING *
    `, events);
}

module.exports = {
  getAll,
  getOne,
  create,
  destroy,
  update
}
