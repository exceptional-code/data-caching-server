const express = require('express');
const groupsRouter = express.Router();
const {
    Groups
} = require('../db');

groupsRouter.route('/')
    .get(async (req, res, next) => {
        /*
            Retrieves all groups from CrossPointe's database and sends them
            to the requesting script on CrossPointe's website.
        */
        try {
            const result = await Groups.get();

            res.send(result);
        } catch (error) {
            // propagate error up to axios-services
            next(error);
        };
    })
    .patch(async (req, res, next) => {

    });

module.exports = groupsRouter;