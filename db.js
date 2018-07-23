const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../poll-db-1/poll.db');

module.exports = db;