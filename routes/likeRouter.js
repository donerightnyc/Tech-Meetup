const likeRouter = require('express').Router();
const likeController = require('../controllers/likeController');
const respController = require('../controllers/responseController');

likeRouter.route('/')
  .get(
    likeController.getAll,
    respController.sendOkResp,
    respController.sendErrResp);

//create an like
likeRouter.route('/new')
  .post(
    likeController.create,
    respController.sendOkResp,
    respController.sendErrResp);

//get one like id
likeRouter.route('/:id')
  .get(
    likeController.getOne,
    respController.sendOkResp,
    respController.sendErrResp)

  .delete(
    likeController.destroy,
    respController.sendOkResp,
    respController.sendErrResp);

module.exports = likeRouter;
