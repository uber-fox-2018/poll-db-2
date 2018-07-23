const db = require('./dbConfig.js');

db.serialize( () => {
    let politicians = `CREATE TABLE politicians (
                id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name	TEXT NOT NULL,
                party	TEXT,
                location	TEXT,
                grade_current	NUMERIC )`;
    db.serialize( () => {
        db.run(politicians, (err) => { 
            if(!err) {
                console.log("Success add table politicians") 
            }
        });
    });
    
    let voters = `CREATE TABLE voters (
        id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        first_name	TEXT,
        last_name	TEXT,
        gender	TEXT,
        age	INTEGER );`;
    db.serialize( () => {
        db.run(voters, (err) => { 
            if(!err) {
                console.log("Success add table voter") 
            }
        });
    });

    let votes = `CREATE TABLE votes (
        id	INTEGER PRIMARY KEY AUTOINCREMENT,
        voter_id	INTEGER,
        politician_id	INTEGER,
        FOREIGN KEY(voter_id) REFERENCES voters(id),
        FOREIGN KEY(politician_id) REFERENCES politicians(id) );`;
    db.serialize( () => {
        db.run(votes, (err) => { 
            if(!err) {
                console.log("Success add table votes") 
            }
        });
    });
});