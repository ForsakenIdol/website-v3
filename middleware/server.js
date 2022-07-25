// Do not run this file. It is purely used for syntax checking before passing to the "middleware.yaml" configmap.
// The 'pg' library uses the PGPASSWORD environment variable if the password is not specified in the script.
const { Client } = require('pg');

const client = new Client({
    // The host and password are platform-dependent and so we pass these as environment variables.
    user: 'postgres',
    database: 'website',
    port: 5432
});

client.connect();

client.query('SELECT * FROM github;', (err, res) => {
    console.log(err ? err.stack : res.rows)
    client.end()
  });