const client = require('./client');

async function dropTables() {
    console.log('Beginning to drop tables...');

    try {
        await client.query(`
            DROP TABLE IF EXISTS groups;
        `);

        console.log('Finished dropping tables.');
    } catch (error) {
        // Rethrow the error to be caught in the server's promise chain.
        console.log('Error dropping tables.');

        throw error;
    };
};

async function buildTables() {
    console.log('Beginning to build tables...');

    try {
        await client.query(`
            CREATE TABLE groups (
                id VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                description VARCHAR(500),
                schedule VARCHAR(255),
                email VARCHAR(50),
                num_members INTEGER,
                virtual_location VARCHAR(100),
                type VARCHAR(50)
            );
        `);

        console.log('Finished building tables.');
    } catch (error) {
        // Rethrow the error to be caught in the server's promise chain.
        console.log('Error building tables.');
        
        throw error;
    };
};

client.connect()
    .then(dropTables)
    .then(buildTables)
    .catch(console.error)
    .finally(() => client.close());