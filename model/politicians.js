const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database');

class Politician{

    static add(name,party,location,grade_current){
        let query = `INSERT INTO Politicians(name,party,location,grade_current)
        Values("${name}","${party}","${location}","${grade_current}");`
        db.serialize(function(err){
            if(err){
                throw err;
            }
            db.run(query)
            console.log("New Politicians has been added")
        })
    }

    static update(id,name,party,location,grade_current){
        let query = `UPDATE Politicians
        SET name = "${name}",
            party = "${party}",
            location = "${location}",
            grade_current = "${grade_current}"
        WHERE id = "${id}"` 
        db.serialize(function(err){
            if(err){
                throw err
            }
            db.run(query)
            console.log("Some Politicians updating data ")
        })
    }

    static delete(id){
        let query = `DELETE FROM Politicians WHERE id = "${id}"`
        db.serialize(function(err){
            if(err){
                throw err
            }
            db.run(query)
            console.log("Some Politicians has been deleted")
        })
    }

    static showPoliticianRange(min,max){
        let query = `SELECT * FROM Politicians 
        WHERE grade_current BETWEEN "${min}" AND "${max}"
        AND party = "R"`
        // db.serialize(function(err){
            db.all(query,function(err,data){
                if(err){
                    throw err
                }
                console.log(data)
            })

        // })
    }

}

Politician.showPoliticianRRange(9,11)

module.exports = Politician