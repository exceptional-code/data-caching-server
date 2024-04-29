const axios = require('axios');
const CROSSPOINTE_URL = process.env.CP_URL || 'http://localhost:4000/api';
const PLANNING_CENTER_URL = process.env.PCO_URL || 'https://api.planningcenteronline.com';
const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;

const getCPGroups = async () => {
    /*
        Called by the CrossPointe website's script every time
        the client views the relevant groups information.
    */
    try {
        const response = await axios.get(CROSSPOINTE_URL + '/groups');

        return response;
    } catch (error) {
        // log error to client
        console.error('Unable to get groups from CrossPointe database:', error);
    };
};

const getPCGroups = async () => {
    /*
        Called by the server periodically to request groups data from
        the Planning Center Online API and return it to be manipulated.
    */
    try {
        const response = await axios.get(PLANNING_CENTER_URL + '/groups/v2/groups', {
            headers: {
                'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`
            }
        });

        return response;
    } catch (error) {
        // propagate error up to index.js
        throw error;
    };
};

module.exports = {
    getCPGroups,
    getPCGroups
};