const client = require('./client');

async function get() {
    /*
        Retrieves all groups from the church's database.
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

async function refresh() {
    /*
        Resets the data in the database so that old irrelevant data doesn't
        persist.
    */
    try {
        await client.query(`
            TRUNCATE TABLE groups;
        `);
    } catch (error) {
        // Propagate error up to api/groups.js.
        throw error;
    };
};

async function insert(group) {
    /*
        Inserts a group object or, conversely, updates an existing group object
        in the church's database.
    */
    const id = group.id;
    const name = group.attributes.name;
    const description = group.attributes.description || '';
    const schedule = group.attributes.schedule || '';
    const email = group.attributes.contact_email || '';
    const numMembers = group.attributes.memberships_count || 0;
    const virtualLocation = group.attributes.virtual_location_url || '';
    const type = group.relationships.group_type.data.type;

    try {
        await client.query(`
            INSERT INTO groups (id, name, description, schedule, email, num_members, virtual_location, type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id)
            DO UPDATE SET
                name = $2,
                description = $3,
                schedule = $4,
                email = $5,
                num_members = $6,
                virtual_location = $7,
                type = $8;
        `, [id, name, description, schedule, email, numMembers, virtualLocation, type]);
    } catch (error) {
        // Propagate error up to api/groups.js.
        throw error;
    };
};

module.exports = {
    get,
    refresh,
    insert
};