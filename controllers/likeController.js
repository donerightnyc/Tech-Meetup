const like = require('../models/like');

function getAll(req, res, next) {
  like.getAll()
    .then(data => {
      res.locals.likes = data;
      next();
    }).catch(next);
}

// take the data and assign it to data variable
function getOne(req, res, next) {
  like.getOne(req.params.id)
  .then(data => {
    res.locals.likes = data;

    next();
  }).catch(next);
}


function create(req, res, next) {
  like.create(req.body)
  .then(data => {
    res.locals.likes = data;
    next();
  }).catch(next);
}

function destroy(req, res, next) {
  like.destroy(req.params.id)
    .then(data => {
    // res.locals.likes = data;
    // console.log(res.locals.likes);
    next();
  }).catch(next);
}

module.exports = {
  getAll,
  getOne,
  create,
  destroy
}
