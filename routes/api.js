const apiRouter = require('express').Router();

const eventRouter = require('./eventRouter');
const authRouter = require('./authRouter');
const likeRouter = require('./likeRouter');

// catching the routes for /events path and /auth path
// whatever is in that path it will render through the apiRouter
apiRouter.use('/events', eventRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/like', likeRouter);

module.exports = apiRouter;
