const db = require('./db')

function SOAL1() {
    let query = `SELECT name,locatiON,grade_current, COUNT(*) AS totalVote 
                 FROM Politicians INNER JOIN Votes 
                    ON Politicians.id = Votes.politicianId
                 WHERE grade_current < 9
                 GROUP BY name
                 ORDER BY totalVote`

    db.all(query, (err,data) => {
        if(err) throw err
        console.log(data);
    })  
}

function SOAL2() {
    let query = `SELECT totalVote,name as PoliticianName,first_name || " " || last_name AS voterName,gender 
                 FROM Votes,
                 (SELECT Politicians.id,name,COUNT(*) AS totalVote 
                 FROM Politicians 
                 INNER JOIN Votes 
                    ON Politicians.id = Votes.politicianId
                 GROUP BY name
                 ORDER BY totalVote DESC
                 limit 3) as data1
                 LEFT join Voters 
                    ON Votes.voterId = Voters.id 
                 WHERE Votes.politicianId = data1.id`

    db.all(query, (err,data) =>{
        if(err) throw err
        console.log(data);
    })  
}

function SOAL3() {
    let query = `SELECT COUNT(*) as totalVote,first_name || " " || last_name AS name,gender,age FROM Voters 
                 INNER JOIN Votes 
                 ON Voters.id = Votes.voterId
                 GROUP BY name
                 HAVING totalVote > 1
                 ORDER BY totalVote desc`


    db.all(query, (err,data) => {
        if(err) throw err
        console.log(data);
    }) 
}

SOAL1()
SOAL2()
SOAL3()
