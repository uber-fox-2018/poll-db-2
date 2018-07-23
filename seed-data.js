const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../poll-db-1/poll-db-1')

function numberOne(){
    let query = `SELECT name, location,  grade_current, COUNT(name) AS totalVote 
                FROM Votes
                INNER JOIN  Politicians
                ON Politicians.politicianId = Votes.politicianId
                WHERE grade_current < 9
                GROUP BY name
                ORDER BY grade_current`

                 
    
    db.all(query,function(err,data){
        if(err) throw err
        console.table(data)
    })
}

function numberTwo(){
    let query = ``

    db.all(query,function(err,data){
        if(err) throw (err)
        console.table(data)
    })
}

numberOne()