const db = require('./db.js')

function release1() {
    let query = `SELECT name, location, grade_current, COUNT (*) AS totalVote FROM Politicians
                INNER JOIN Votes ON Votes.politicianID = Politicians.politicianID
                WHERE grade_current < 9
                GROUP BY name
                ORDER BY grade_current ASC`

    db.all(query, function(err,data) {
        if (err) throw err
        console.table(data)
    })
}

function release2() {
    let query = `WITH subquery AS (
                SELECT politicians.politicianID as subqueryID, name, count(votes.politicianID) as totalVote 
                FROM politicians 
                JOIN votes 
                ON politicians.politicianID = votes.politicianID
                GROUP BY name 
                ORDER BY totalVote DESC
                )
                SELECT subquery.name as politicianName, subquery.totalVote,voters.first_name||' '||voters.last_name as full_name, gender
                FROM voters 
                JOIN votes 
                ON voters.voterID = votes.voterID
                JOIN subquery
                ON subqueryID = votes.politicianID 
                GROUP BY full_name 
                ORDER BY totalVote DESC`
    db.all(query, function(err,data) {
        if (err) throw err
        console.table(data)
    })
}

function release3() {
    let query = `SELECT COUNT(votes.voterID) as totalVotes, voters.first_name||' '||voters.last_name as full_name, gender, age 
                FROM votes 
                JOIN voters 
                ON votes.voterID = voters.voterID
                GROUP BY full_name 
                HAVING totalVotes > 1 
                ORDER BY totalVotes DESC`

    db.all(query, function(err,data) {
        if (err) throw err
        console.table(data)
    })
}

release1()
release2()
release3()