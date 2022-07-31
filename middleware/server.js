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

/* Admin Paths */

app.get('/kill', (req, res) => {
    console.log("GET /kill");
    client.end()
    .then(() => {
        console.log("Successfully disconnected client.");
        res.status(200).send({
            'status': 200,
            'response': { 'message': "Successfully disconnected client." }
        });
        process.exit(0);
    })
    .catch(error => {
        console.log("Error during disconnection.");
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

// GET all

app.get('/get', (req, res) => {
    console.log("GET /get");
    client.query('SELECT * FROM github;', (err, client_res) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'status': 500,
                'response': { 'message': 'There was an error processing your request.' }
            });
        }
        else return res.status(200).send({
            'status': 200,
            'response': { 'rows': client_res.rows }
        });
    });
});

// GET by repo_id

app.get('/get/id/:id', (req, res) => {
    console.log(`GET /get/id/${req.params.id}`)
    return res.status(501).send({
        'status': 501,
        'response': { 'message': 'Not implemented!' }
    })
});