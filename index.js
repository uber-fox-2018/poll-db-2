const db = require('./setup')

class Sql {
    static gradeUnderNine(){
        let query = `SELECT name, location, grade_current, COUNT(*) AS totalVote 
                     FROM politicians JOIN votes
                     ON politicians.id = votes.politician_id
                     WHERE politicians.grade_current < 9
                     GROUP BY politicians.name
                     ORDER BY politicians.grade_current`

        db.all(query, function(err, data){
            console.log(data)
        })
    }

    

}

Sql.gradeUnderNine()