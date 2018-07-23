const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database');

class Voter{

    static add(first_name,last_name,gender,age){
        let query = `INSERT INTO Voters(first_name,last_name,gender,age)
        Values("${first_name}","${last_name}","${gender}","${age}");`
        db.serialize(function(err){
            if(err){
                throw err;
            }
            db.run(query)
            console.log("New Voters has been added")
        })
    }

    static update(id,first_name,last_name,gender,age){
        let query = `UPDATE Voters
        SET first_name = "${first_name}",
            last_name = "${last_name}",
            gender = "${gender}",
            age = "${age}"
        WHERE id = "${id}"` 
        db.serialize(function(err){
            if(err){
                throw err
            }
            db.run(query)
            console.log("Some Voters updating data ")
        })
    }

    static delete(id){
        let query = `DELETE FROM Voters WHERE id = "${id}"`
        db.serialize(function(err){
            if(err){
                throw err
            }
            db.run(query)
            console.log("Some Voters has been deleted")
        })
    }

}   

// Voter.add('Abah','Gokil','male','57')
// Voter.update(151,"Kakek","Funky","male","60")
// Voter.delete(151)

module.exports = Voter
