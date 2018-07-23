const db = require('./setup');

function gradeUnder(num){
    let sql = `SELECT name, location, grade_current,
               COUNT (name) as totalVote
               FROM Politicians
               JOIN Votes
               ON Politicians.politicianID = Votes.politicianID
               WHERE grade_current < ${num}
               GROUP BY grade_current`;
    db.all(sql,(err, data) => {
        if (err) throw err;
        console.table(data);
        });
}

function topThreePoliticians(){
    let sql = `SELECT topThreeTable.totalVote, topThreeTable.politicianName, (first_name||' '||last_name) AS voterName, gender FROM Votes,
	           (SELECT COUNT(name) as totalVote, name as politicianName, politicians.politicianID
	           FROM Politicians
	           JOIN Votes
	           ON Politicians.politicianID = Votes.politicianID
	           GROUP BY 2
	           ORDER BY totalVote DESC
	           limit 3) AS topThreeTable
               JOIN Voters
               ON Votes.voterID = Voters.voterID
               WHERE Votes.politicianID = topThreeTable.politicianID
               ORDER BY politicianName DESC`;
    db.all(sql, (err, data)=>{
        if(err) throw err
        console.table(data);
    })
}

function fraudVoters(){
    let sql = `SELECT COUNT(*) as totalVote, first_name || " " || last_name as name, gender, age
               FROM Voters
               JOIN Votes
               ON Voters.voterID = Votes.voterID
               GROUP BY name HAVING totalVote > 1
               ORDER BY totalVote DESC`;
    db.all(sql, (err, data)=>{
        if(err) throw err
        console.table(data);
    })
}

gradeUnder(9);
topThreePoliticians();
fraudVoters();