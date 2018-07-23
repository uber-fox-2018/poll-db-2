//your code here
const db = require('./database')

function createTable() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS Politicians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255),
            party VARCHAR(100),
            location TEXT,
            grade_current FLOAT
        );`, (err) => {
            (err) ? console.log(err) : console.log('table Politicians has been created in database'); 
        })

        db.run(`CREATE TABLE IF NOT EXISTS Voters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName VARCHAR(255),
            lastName VARCHAR(100),
            gender VARCHAR(8),
            age INTEGER(4)
        );`, (err) => {
            (err) ? console.log(err) : console.log('table Voters has been created in database'); 
        })

        db.run(`CREATE TABLE IF NOT EXISTS Votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER,
            politicianId INTEGER
        );`, (err) => {
            (err) ? console.log(err) : console.log('table Votes has been created in database'); 
        })
    })
}


createTable()