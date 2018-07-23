const db = require('./db')
const Table = require('cli-table')

const gradeMin = () => {
  const table = new Table()
  let queryGradeMin = `SELECT name, location, grade_current, COUNT (politician_id) AS totalVote 
                       FROM Politicians 
                       JOIN Votes 
                       ON Politicians.id = Votes.politician_id
                       WHERE grade_current < 9
                       GROUP BY name
                       ORDER BY grade_current ASC`

  db.all(queryGradeMin, (err, data) => {
    if (err) throw err
    table.push(['Name', 'Location', 'Grade Current', 'Total Vote'])
    for (let i = 0; i < data.length; i++) {
      var list = []
      list.push(
        data[i].name,
        data[i].location,
        data[i].grade_current,
        data[i].totalVote
      )
      table.push(list)
    }
    console.log(table.toString())
  })                     
}

const topVote = () => {
  const table = new Table()
  let queryTopVote = `SELECT totalVote, politicianName, (first_name || " " || last_name) as voterName, gender FROM Votes, (
                      SELECT COUNT(politician_id) AS totalVote, name AS politicianName, politician_id
                      FROM Politicians
                      JOIN Votes
                      ON Politicians.id = Votes.politician_id
                      GROUP BY politician_id
                      ORDER BY totalVote DESC
                      LIMIT 3
                    ) AS TopVote
                    LEFT JOIN Voters
                    ON Voters.id = Votes.voter_id
                    WHERE Votes.politician_id = TopVote.politician_id`

  db.all(queryTopVote, (err, data) => {
    if (err) throw err;
    table.push(['Politician Name', 'Voter Name', 'Gender', 'Total Vote'])
    for (let i = 0; i < data.length; i++) {
      var list = []
      list.push(
        data[i].politicianName,
        data[i].voterName,
        data[i].gender,
        data[i].totalVote,
      )
      table.push(list)
    }
    console.log(table.toString())
  })
}

const listFraud = () => {
  const table = new Table()
  let queryFraud = `SELECT COUNT(voter_id) AS totalVote, (first_name || " " || last_name) AS name, gender,                      age FROM Voters
                    JOIN Votes
                    ON Voters.id  = Votes.voter_id
                    GROUP BY name
                    HAVING totalVote > 1
                    ORDER BY totalVote DESC`

  db.all(queryFraud, (err, data) => {
    if (err) throw err
    for (let i = 0; i < data.length; i++) {
      var list = []
      list.push(
        data[i].name,
        data[i].gender,
        data[i].age,
        data[i].totalVote
      )
      table.push(list)
    }
    console.log(table.toString())
  })
}

gradeMin()
topVote()
listFraud()