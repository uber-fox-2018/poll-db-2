//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database');


function createTable(){
    db.serialize(function(){

        db.run(`CREATE TABLE IF NOT EXISTS Politicians(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(30),
            party VARCHAR(30),
            location VARCHAR(10),
            grade_current FLOAT 
        )`);
    
        db.run(`CREATE TABLE IF NOT EXISTS Voters(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(30),
            last_name VARCHAR(30),
            gender VARCHAR(10),
            age INTEGER
        )`);
    
        db.run(`CREATE TABLE IF NOT EXISTS Votes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER NOT NULL,
            politicianId INTEGER NOT NULL,
            FOREIGN KEY(voterId) REFERENCES Voters(id),
            FOREIGN KEY(politicianId) REFERENCES Politicians(id)
        )`);
    })
}

createTable();


