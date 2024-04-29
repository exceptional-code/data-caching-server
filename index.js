const express = require('express');
const server = express();
const cron = require('node-cron');
require('dotenv').config();
const client = require('./db/client');
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const {
    getPCGroups
} = require('./axios-services');

function secureProtocol(req, res, next) {
    const protocol = req.protocol;

    if (protocol === 'https') {
        next()
    } else {
        res.status(403).send('ProtocolError: only HTTPS requests are allowed.');
    };
};

server.use(express.json());
server.use(secureProtocol);
server.use('/api', require('./api'));

cron.schedule('0 0 * * *', async () => {
    try {
        const response = await getPCGroups();

        
    } catch (error) {
        console.error('Error retrieving data from Planning Center API:', error);
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
    3. npm i cors & then use cors headers to give requests from crosspointe website permission
    4. In cron.schedule() in server's index.js finish sending all retrieved data from PCO API to crosspointe_db
    5. In db/groups.js finish writing the insert() query for updating data in crosspointe_db
    6. write any necessary production scripts in package.json
    7. write any necessary development scripts in package.json
    8. write rate limit code in to the API to avoid ddos attacks from the website's URL
    9. write any other security features in for the API after consulting with any relevant sources on security about my specific situation
*/