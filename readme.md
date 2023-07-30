# Simple Configurable KnexJs API Server

## How to Develop Locally

Uses sqlite3 for local development:

1. Create sqlite database

   - update `sqlite-db.sql` according to your need

   - create sqlite db:
     ```bash
     npm run sqlite3:create
     ```

2. Allow which tables endpoints are allowed through endpoints

   - utils/config file need update for allowed endpoints

   - will continue...
