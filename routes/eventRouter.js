const eventRouter = require('express').Router();
const eventController = require('../controllers/eventController');
const respController = require('../controllers/responseController');

eventRouter.route('/')
  .get(
    eventController.getAll,
    respController.sendOkResp,
    respController.sendErrResp);

//create an event
eventRouter.route('/new')
  .post(
    eventController.create,
    respController.sendOkResp,
    respController.sendErrResp);

//get one event id
eventRouter.route('/:id')
  .get(
    eventController.getOne,
    respController.sendOkResp,
    respController.sendErrResp)

  .delete(
    eventController.destroy,
    respController.sendOkResp,
    respController.sendErrResp)

  .put(
    eventController.update,
    respController.sendOkResp,
    respController.sendErrResp);

module.exports = eventRouter;
