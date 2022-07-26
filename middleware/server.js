/*
 ******************************
 * PostgreSQL Server
 ******************************
 * 
 * This server contains the 4 main CRUD operations all targeting the 'github' table 'website' database.
 * It assumes that the relevant relations exist and makes no atttempt to check that they do.
 * 
 * Run this file with "npm run dev". The relevant environment variables are as follows.
 * - PGHOST: PostgreSQL hostname.
 * - PGPASSWORD: PostgreSQL password.
 * - EXPRESSPORT: Port for the Express.js wrapper.
 * 
 */

const { Client } = require('pg');
const express = require('express');

const client = new Client({
    // The host and password are platform-dependent and so we pass these as environment variables.
    user: 'postgres',
    database: 'website',
    port: 5432
});

const app = express();
const app_port = process.env.EXPRESSPORT;

app.listen(app_port, () => {
    console.log(`Server listening on port ${app_port}.`);
    client.connect(err => {
        if (err) {
            console.log(err);
            throw "There was an error connecting to the PostgreSQL database.";
        }
        else console.log(`Connected to the PostgreSQL database at '${process.env.PGHOST}'.`);
    });
});

/* Test Paths */

app.get('/test', (req, res) => {
    client.query('SELECT * FROM github;', (err, client_res) => {
        return res.send(err ? err.stack : client_res.rows);
    });
});

app.get('/kill', (req, res) => {
    client.end()
    .then(() => {
        console.log("Successfully disconnected client.");
        res.send("Successfully disconnected client.");
        process.exit(0);
    })
    .catch(error => {
        console.log("Error during disconnection.");
        res.send("Error during disconnection.");
        process.exit(1);
    });
})

  /* CRUD Paths */