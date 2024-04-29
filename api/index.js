const express = require('express');
const apiRouter = express.Router();
const groupsRouter = require('./groups');

apiRouter.use('/groups', groupsRouter);

module.exports = apiRouter;