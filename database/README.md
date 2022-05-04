## The Database

The database for this website runs off PostgreSQL. This document will summarise my learnings and other key things I should keep in mind.

### Terminal Workflow

At terminal boot...

1. `pgsql` aliases to `/Library/PostgreSQL/14/scripts/runpsql.sh`, which runs the script to connect to the PostgreSQL database.
2. Use the defaults that `pgsql` provides and enter the user password at the end.
3. By default, PostgreSQL does not connect to a database. Use `\l` to list databases and `\c <database_name>` to connect to a database.
4. Use `\dt` to list the tables in the database. SQL queries can now be performed as normal.