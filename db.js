const Sqlite3 = require('sqlite3')
const db = new Sqlite3.Database("../poll-db-1/poll.db")

module.exports = db