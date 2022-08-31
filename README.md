# My Website v3

This repository contains all the project files for the third iteration of my website. In this iteration, I will keep the frontend to a single page and explore the GitHub API, pulling project metadata into a database, and feeding that data to the frontend to be rendered in a table.

Created by **lachldw** at AWS.

## Framework Stack

There will be 4 main components to my website and each component will serve a different purpose. In terms of the development phases, this will also serve as the order in which each component should be designed, from 1 to 4.

### 0. Overall

**Stack**: Kubernetes / Docker

All the components of this website will be hosted through Kubernetes.

### 1. Database

**Stack**: PostgreSQL

The database contains application data. At the present moment, this will likely be a single table containing GitHub repository information. The schema of this table has not been decided yet. In the interests of learning a new type of database and because [`npm pg`](https://www.npmjs.com/package/pg) has over 3 times the number of weekly downloads over [`npm mysql`](https://www.npmjs.com/package/mysql), the database will be created in PostgreSQL.

### 2. Database Server (Middleware)

**Stack**: Express.js (JavaScript)

The server is middleware that sits in front of the database and exposes CRUD operations. This serves 2 main purposes:

- Validating incoming HTTP requests for PUT, GET, and DELETE operations, e.g. if the request is formatted incorrectly or if authentication data was not sent with the request. We do not need a PATCH route as the database is transient and can be wiped and restored as required.
- Abstract the database away from the frontend, making switching databases easier if desired or required.

### 3. GitHub Cronjob

**Stack**: Python

The GitHub cronjob's main purpose is to act as a script that can be called by the crontab every minute. When called, the script will make a request to the GitHub API for all the repositories from a certain user, most likely my "lachldwaws" account, and feed this data, one repository at a time, to the database server. Because this component is largely separate from the other 3 components and only sends data to the database server, I will have a go at writing this script in Python.

### 4. Frontend

**Stack**: Express.js (JavaScript)

The frontend is a single-page website rendered through an `Express.js` route with associated logic pulling from the database server. A single-page architecture keeps things simple. All other routes in the application's frontend should be authenticated routes, hidden behind some sort of authentication logic, if they exist - highly unlikely given that there isn't really much of a reason to have login logic, unless I want to set up Prometheus + Grafana monitoring.

*Could the frontend be done in* `Next.js` *instead? Expore and learn the* `Next.js` *framework and find out if this is possible.*

## Useful Links

- [The `node-postgres` documentation.](https://node-postgres.com/)
- [The `Express.js` documentation.](https://expressjs.com/)
- [`Typewriter.js`](https://safi.me.uk/typewriterjs/) and the corresponding [GitHub repository](https://github.com/tameemsafi/typewriterjs).
- [`Odometer.js`.](https://github.hubspot.com/odometer/docs/welcome/)
- [A cool way to do single-page "scrolling" navigation in JavaScript.](https://www.turnwall.com/articles/adding-single-page-scrolling-navigation-to-your-site/)
-   [Kubegres, a solution for automatic PostgreSQL cluster replication.](https://www.kubegres.io/doc/getting-started.html)
- [Deploying Next.js to Kubernetes](https://medium.com/ne-digital/deploy-nextjs-app-to-kubernetes-using-bitbucket-pipeline-3c152b742b0a)