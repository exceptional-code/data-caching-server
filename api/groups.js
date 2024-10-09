const express = require('express');
const groupsRouter = express.Router();
const {
    Groups
} = require('../db');

groupsRouter.route('/')
    .get(async (req, res, next) => {
        /*
            Retrieves all groups from the church's database and sends them
            to the requesting script on the church's website.
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
        /*
            Future code for when you want to handle a patch request to the API to update data in the church's database.
        */

    });

module.exports = groupsRouter;