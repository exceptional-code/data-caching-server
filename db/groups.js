const client = require('./client');

async function get() {
    /*
        Retrieves all groups from CrossPointe's database.
    */
   try {
        const { rows } = await client.query(`
            SELECT *
            FROM groups;
        `);

        return rows;
   } catch (error) {
        // Propagate error up to api/groups.js.
        throw error;
   };
};

async function insert() {
    /*
        Inserts groups data into CrossPointe's database if no
        matching rows. If rows exist already, it updates the
        existing data.
    */
    try {
        const { rows } = await client.query(`
            INSERT INTO groups (col1, col2)
            VALUES (val1, val2)
            ON CONFLICT (unique_key_column)
            DO UPDATE SET
                col1 = EXCLUDED.col1
                col2 = EXCLUDED.col2;
        `);

        return rows;
    } catch (error) {
        // Propagate error up to api/groups.js.
        throw error;
    };
};

module.exports = {
    get,
    insert
};