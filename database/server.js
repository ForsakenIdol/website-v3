// Call this file with PGPASSWORD=<> node server.js to pass the password as an env variable to the script.
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'dvdrental',
    // The password goes in an environment variable in production hosting.
    port: 5432
});

client.connect();

client.query('SELECT $1::text as message', ['Hello World!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message) // Hello World!
    client.end()
  })