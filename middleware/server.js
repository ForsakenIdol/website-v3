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

// The 'body-parser' package may not be required.
// See: https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
// Here, we test that hypothesis by using Express.js' implementation of body-parser logic.

app.use(express.json());

app.listen(app_port, () => {
    logMessage(`Server listening on port ${app_port}.`);
    client.connect(err => {
        if (err) {
            console.log(err);
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

/*
 * Test Command:
 * curl -X POST -H "Content-Type: application/json" \
-d '{ "repo_id": 9375101, "repo_name": "my_test_repo_1", "description": "my test description", "private": "t" }' \
localhost:9001/create
 */

app.post('/create', (req, res) => {
    logMessage("POST /create");
    console.log(req.body);

    // There is 1 key field that needs to be present; all the others are optional.
    const repo_id = req.body.repo_id;
    if (!repo_id || typeof(repo_id) != 'number') return res.status(400).send({
        'status': 400,
        'response': { 'message': 'Malformed query; missing required field repo_id.' }
    });

    const query = "INSERT INTO github VALUES ($1, $2, $3, $4, $5, $6);";
    // Construct the query parameters
    const repo_name = req.body.repo_name;
    const created_at = req.body.created_at;
    const description = req.body.description;
    const url = req.body.url;
    const private = req.body.private;
    const parameters = [
        repo_id,
        repo_name ? repo_name : "",
        created_at ? created_at : new Date(), // Default to Now
        description ? description : "",
        url ? url : "",
        private ? private : 'f' // Default to public repository setting
    ];

    logMessage(`Inserting Parameters: ${parameters}`);

    client.query(query, parameters, (err, db_res) => {
        if (err) {
            // Special handling for duplicate primary key error (Code 23505)
            if (err.code == 23505) {
                return res.status(400).send({
                    'status': 400,
                    'response': {
                        'message': "Unique key violation.",
                        'detail': err.detail
                    }
                });
            }
            else {
                console.log(err);
                return res.status(500).send({
                    'status': 500,
                    'response': { 'message': 'There was an error processing your request.' }
                });
            }
        }
        else {
            const success_message = `${db_res.command} command created ${db_res.rowCount} new entry successfully.`;
            logMessage(success_message);
            // Return inserted row
            return res.status(201).send({
                'status': 201,
                'response': {
                    'message': success_message,
                    'entry': {
                        'repo_id': repo_id,
                        'repo_name': repo_name,
                        'created_at': created_at,
                        'description': description,
                        'url': url,
                        'private': private
                    }
                }
            });
        }
    });
});

// GET all

app.get('/get', (req, res) => {
    logMessage("GET /get");
    client.query('SELECT * FROM github;', (err, db_res) => {
        if (err) {
            console.log(err);
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
            console.log(err);
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

// POST delete by repo_id

app.post('/delete/id/:id', (req, res) => {
    logMessage("POST /delete");
    logMessage(`Deleting repository with ID ${req.params.id}...`);
    const query = "DELETE FROM github WHERE repo_id = $1";
    const parameters = [ req.params.id ];
    client.query(query, parameters, (err, db_res) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'status': 500,
                'response': { 'message': 'There was an error processing your request.' }
            });
        }
        else {
            const result_message = `DELETE operation affected ${db_res.rowCount} rows.`;
            logMessage(result_message)
            // A DELETE operation that affects zero rows still returns success by node-postgres.
            // We need to catch this and explicity make it a client error.
            if (db_res.rowCount == 0) {
                return res.status(400).send({
                    'status': 400,
                    'response': {
                        'message': result_message
                    }
                });
            }
            else {
                logMessage("DELETE affected at least 1 row.");
                // Could return deleted row, but this is optional.
                return res.status(200).send({
                    'status': 200,
                    'response': {
                        'message': result_message,
                    }
                });
            }
        }
    });
})