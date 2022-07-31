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

/* Helper Functions */

const getDateString = offset => { return (Date() + offset).split(' (')[0]; }
const offset = 8; // Fixed for AWST for now.

const logMessage = message => { console.log(`[${getDateString(offset)}] ${message}`); }

/* App Setup */

const client = new Client({
    // The host and password are platform-dependent and so we pass these as environment variables.
    user: 'postgres',
    database: 'website',
    port: 5432
});

const app = express();
const app_port = process.env.EXPRESSPORT;

app.listen(app_port, () => {
    logMessage(`Server listening on port ${app_port}.`);
    client.connect(err => {
        if (err) {
            logMessage(err);
            throw "There was an error connecting to the PostgreSQL database.";
        }
        else logMessage(`Connected to the PostgreSQL database at '${process.env.PGHOST}'.`);
    });
});

/* Admin Paths */

app.get('/kill', (req, res) => {
    logMessage(`GET /kill`);
    client.end()
    .then(() => {
        logMessage("Successfully disconnected client.");
        res.status(200).send({
            'status': 200,
            'response': { 'message': "Successfully disconnected client." }
        });
        process.exit(0);
    })
    .catch(error => {
        logMessage("Error during disconnection.");
        res.status(500).send({
            'status': 500,
            'response': { 'message': "Error during disconnection." }
        });
        process.exit(1);
    });
})

/* 
 * CRD Paths (We don't need an Update path, since we won't be checking if rows change,
 * at every update we'll just delete and re-add the row since the primary key is the
 * repo ID.)
 */

// CREATE (POST) new row

// TODO

// GET all

app.get('/get', (req, res) => {
    logMessage("GET /get");
    client.query('SELECT * FROM github;', (err, db_res) => {
        if (err) {
            logMessage(err);
            return res.status(500).send({
                'status': 500,
                'response': { 'message': 'There was an error processing your request.' }
            });
        }
        else {
            logMessage(`Returned ${db_res.rows.length} rows.`);
            return res.status(200).send({
                'status': 200,
                'response': { 'rows': db_res.rows }
            });
        }
    });
});

// GET by repo_id

app.get('/get/id/:id', (req, res) => {
    logMessage(`GET /get/id/${req.params.id}`);
    const query = "SELECT * FROM github WHERE repo_id = $1;";
    const parameters = [ req.params.id ];
    client.query(query, parameters, (err, db_res) => {
        if (err) {
            logMessage(err);
            return res.status(500).send({
                'status': 500,
                'response': { 'message': 'There was an error processing your request.' }
            });
        }
        else {
            logMessage(`Returned ${db_res.rows.length} rows.`);
            return res.status(200).send({
                'status': 200,
                'response': { 'rows': db_res.rows }
            });
        }
    });
});