const cors = require('cors');
const express = require('express');
const server = express();
const cron = require('node-cron');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const client = require('./db/client');
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const {
    getPCGroups
} = require('./axios-services');
const {
    Groups
} = require('./db');

function secureProtocol(req, res, next) {
    /*
        Checks to see if a web hosting service is using secure protocol through
        X-Forwarded-Proto header or if I need to handle it myself. Then rejects
        the client request if a secure protocol such as https is not used or
        permits it if used.
    */
    const rawProtocol = req.get('X-Forwarded-Proto') || req.protocol;
    const protocol = rawProtocol.substring(0, 5).toLowerCase();

    if (protocol === 'https') {
        next()
    } else {
        res.status(403).send('ProtocolError: only HTTPS requests are allowed.');
    };
};

// Only permit GET requests and only from CrossPointe's website.
const secureOptions = {
    origin: 'https://cpnorman.thechurchco.com/',
    methods: 'GET'
};

// Define a rate limiter to limit request to 33 per 5 minutes from the same IP.
const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 33,
    message: 'RateLimitError: too many requests.'
});

server.use(express.json());
server.use(cors(secureOptions));
server.use(secureProtocol);
server.use(rateLimiter);
server.use('/api', require('./api'));

cron.schedule('0 0 * * *', async () => {
    /*
        Fetches groups data from a third party database at the beginning of every day
        and inserts that data into our local database. Handles data insertion and
        data retrieval errors if any responses return with rejections.
    */
    try {
        const groups = await getPCGroups();
        let message = '';

        for (const group of groups) {
            try {
                await Groups.insert(group);
            } catch (error) {
                message.concat(error + '\n');
            };
        };

        if (message !== '') throw Error('DataInsertionError:', message);
    } catch (error) {
        if (error.name === 'DataInsertionError') {
            console.error(error);
        } else {
            console.error('DataRetrievalError:', error);
        };
    };
});

server.listen(SERVER_PORT, async () => {
    console.log(`Server is running on PORT: ${SERVER_PORT}`);

    try {
        await client.connect();
        console.log('Connected to database!');
    } catch (error) {
        console.error('Database is down!\n', error);
    };
});

/*
TO-DO:
    6. write any necessary production scripts in package.json
    13. might need to write input validation for .post() requests if in the future handling
        input from forms
*/