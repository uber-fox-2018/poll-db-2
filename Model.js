'use strick'
const db = require('./dbConfig.js');

class Model {

    // Create politician from argv
    static addPolitician(name, party, location, grade_current) {
        let query = `INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ("${name}", "${party}", "${location}", "${grade_current}")`;
        db.serialize( () => {
            db.run(query, (err) => {
                if (err) throw err;
            });
        })
        
    }

    // Read politician from argv
    static readingPolitician(dataQuery) {
        let query = `SELECT * FROM politicians`;
        db.serialize( () => {  
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read pilotician where party is R
    static readingPoliticianPartyRGradeNineToEleven(dataQuery) {
        let query = `SELECT * FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read jumlah vote bernama Olympia Snowe
    static readingPoliticianOlympia(dataQuery) {
        let query = `select count(*) as totalVote, name from votes join politicians on votes.politician_id = politicians.id where politicians.name = "Olympia Snowe"`;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read jumlah vote bernama %adam%
    static readingPoliticianAdam(dataQuery) {
        let query = `select name, count(*) as totalVote from votes join politicians on votes.politician_id = politicians.id where politicians.name LIKE "%adam%" group by politicians.name`;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read jumlah vote 3 besar
    static readingPoliticianThre(dataQuery) {
        let query = `select count(*) as totalVote, * 
                    from votes join politicians 
                    on votes.politician_id = politicians.id
                    group by politicians.name
                    order by totalVote desc limit 3`;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read jumlah vote Olympia
    static readingPoliticianVoteOlympia(dataQuery) {
        let query = `select first_name, last_name, gender, age from voters join votes
                    on voters.id = votes.voter_id join politicians
                    on votes.politician_id = politicians.id 
                    where politicians.name = "Olympia Snowe"`;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read jumlah < 9
    static readingPoliticianVoteNine(dataQuery) {
        let query = `SELECT name, location, grade_current, count(*) as totalVote FROM politicians 
                    join votes 
                    on politicians.id = votes.politician_id
                    WHERE grade_current < 9
                    group by politicians.name
                    order by totalVote
                    `;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // read jumlah winner
    static readingPoliticianVoteWinner(dataQuery) {
        let query = `
                    `;
        db.serialize( () => {
            db.all(query, (err, data) => {
                dataQuery(data);
            })
        })
    }

    // Insert voter from argv
    static addVoter(first_name, last_name, gender, age) {
        let query = `INSERT INTO voters (first_name, last_name, gender, age)
                        VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`;
        db.serialize( () => {
            db.run(query, (err) => {
                if (err) throw err;
            });
        })
    }

    // Inser vote from argv
    static addVote(voter_id, politician_id) {
        let query = `INSERT INTO votes (voter_id, politician_id)
                    VALUES ("${voter_id}", "${politician_id}")`;
        db.serialize( () => {
            db.run(query, (err) => {
                if (err) throw err;
            })
        });
    }   
    
}

module.exports = Model