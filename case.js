const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Case {

  static a (){
    db.all(`SELECT P.name, P.location, P.grade_current, COUNT (PV.voter_id) totalVote
    FROM Politicians P
    INNER JOIN PoliticianVoters PV ON P.id = PV.politician_id
    WHERE P.grade_current < 9
    GROUP BY P.name
    ORDER BY totalVote`, (err, rows) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(rows)
      }
    })
  }

  static b (){
    db.all(`SELECT NT.totalVote, NT.politicianName, V.first_name || " " || V.last_name voterName, V.gender
    FROM PoliticianVoters PV
    INNER JOIN (SELECT COUNT (PV.voter_id) totalVote, P.name politicianName, P.id
    FROM Politicians P
    INNER JOIN PoliticianVoters PV 
    ON PV.politician_id = P.id
    GROUP BY P.name
    ORDER BY totalVote DESC
    LIMIT 3) NT
    ON PV.politician_id = NT.id
    INNER JOIN Voters V
    ON PV.voter_id = V.id
    ORDER BY totalVote DESC`, (err, rows) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(rows)
      }
    })
  }

  static c (){
    db.all(`SELECT COUNT (PV.voter_id) totalVote, V.first_name || " " || V.last_name name, V.gender, V.age
    FROM Voters V
    INNER JOIN PoliticianVoters PV
    ON V.id = PV.voter_id
    GROUP BY PV.voter_id
    HAVING totalVote > 1
    ORDER BY totalVote DESC`, (err, rows) => {
      if (err){
        console.log(err.message);
      } else {
        console.log(rows)
      }
    })
  }
}

Case.a();
Case.b();
Case.c();