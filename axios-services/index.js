const axios = require('axios');
const DATA_CACHING_SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000/api';
const API_URL = process.env.API_URL || 'https://api.planningcenteronline.com';
const APP_ID = process.env.APP_ID;
const SECRET = process.env.SECRET;

const getCPGroups = async () => {
    /*
        Called by the script on the church's website every time
        the client views the relevant groups information.
    */
    try {
        const response = await axios.get(DATA_CACHING_SERVER_URL + '/groups');

        return response;
    } catch (error) {
        // log error to client
        console.error(`Unable to get groups from the church's database:`, error);
    };
};

const getPCGroups = async () => {
    /*
        Called by the church's data caching server periodically to request
        groups data from the hosting service's API and return it to be
        manipulated.
    */
    try {
        const response = await axios.get(API_URL + '/groups/v2/groups', {
            auth: {
                username: `${APP_ID}`,
                password: `${SECRET}`
            }
        });

        return response.data.data;
    } catch (error) {
        // propagate error up to index.js
        throw error;
    };
};

module.exports = {
    getCPGroups,
    getPCGroups
};