-- This file defines the schema for the GitHub table in the website database.
-- The website database cannot be created by a PostgreSQL dump.
-- The database needs to be created, and the SQL dump targeted at that database.

DROP TABLE IF EXISTS github;
CREATE TABLE github (
    repo_id INT PRIMARY KEY,
    repo_name VARCHAR (256) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    private BOOLEAN NOT NULL
);

INSERT INTO github VALUES (
    463741050,
    'db_cont_test',
    '2022-02-26 03:17:36+00',
    'A simple 2-service setup to practise management of multiple containers in a project.',
    'https://api.github.com/repos/lachldwaws/db_cont_test',
    false
);