const Event = require('../models/event');

function getAll(req, res, next) {
  Event.getAll()
    .then(data => {
      res.locals.events = data;
      next();
    }).catch(next);
}

// take the data and assign it to data variable
function getOne(req, res, next) {
  Event.getOne(req.params.id)
  .then(data => {
    res.locals.events = data;
    next();
  }).catch(next);
}


function create(req, res, next) {
  Event.create(req.body)
  .then(data => {
    res.locals.events = data;
    console.log(res.locals.events);
    next();
  }).catch(next);
}

function destroy(req, res, next) {
  Event.destroy(req.params.id)
    .then(data => {
    // res.locals.events = data;
    // console.log(res.locals.events);
    next();
  }).catch(next);
}

function update(req, res, next) {
  Event.update(req.body)
    .then(data => {
    res.locals.events = data;
    next();
  }).catch(next);
}

module.exports = {
  getAll,
  getOne,
  create,
  destroy,
  update
}
