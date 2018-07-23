const db = require('./dbConfig');
const fs = require('fs');

class SeedData {
    static dataSeed() {
        console.clear();
        console.log('Please wait...');
        let dataPoliticians = this.ReadPoliticians();
        this.WriteFromCSVPoliticians(dataPoliticians)

        let dataVoters = this.ReadVoters();
        this.WriteFromCSVVoters(dataVoters);

        let dataVotes = this.ReadVotes();
        this.WriteFromCSVVotes(dataVotes);
    }

    // baca data dari csv politicians
    static ReadPoliticians() {
        let politicians = fs.readFileSync('./politicians.csv', 'utf8');
        let politicanarr = politicians.split('\n');
        let dataPoliticians = [];
        for(let i in politicanarr) {
            dataPoliticians.push(politicanarr[i].split(','));
        }
        return dataPoliticians
    }

    // tulis data dari csv ke sqlite politicians
    static WriteFromCSVPoliticians(data) {
        for(let i = 1; i < data.length; i++) {
            let query = `INSERT INTO politicians (name, party, location, grade_current)
                        VALUES ("${data[i][0]}", "${data[i][1]}", "${data[i][2]}", "${data[i][3]}")`;
            db.serialize(() => {
                db.run(query, (err) => {
                    if (err) throw err;
                });
            });
        }
    }

    // baca data dari csv voters
    static ReadVoters() {
        let voters = fs.readFileSync('./voters.csv', 'utf8');
        let voterarr = voters.split('\n');
        let datavoters = [];
        for(let i in voterarr) {
            datavoters.push(voterarr[i].split(','));
        }
        return datavoters
    }

    // tulis data dari csv ke sqlite voters
    static WriteFromCSVVoters(data) {
        for(let i = 1; i < data.length; i++) {
            let query = `INSERT INTO voters (first_name, last_name, gender, age)
                        VALUES ("${data[i][0]}", "${data[i][1]}", "${data[i][2]}", "${data[i][3]}")`;
            db.serialize(() => {
                db.run(query, (err) => {
                    if (err) throw err;
                });
            });
        }
    }

    // baca file csv votes
    static ReadVotes() {
        let votes = fs.readFileSync('./votes.csv', 'utf8');
        let votearr = votes.split('\n');
        let datavotes = [];
        for(let i in votearr) {
            datavotes.push(votearr[i].split(','));
        }
        return datavotes
    }

    // tulis data dari csv ke sqlite votes
    static WriteFromCSVVotes(data) {
        for(let i = 1; i < data.length; i++) {
            let query = `INSERT INTO votes (voter_id, politician_id)
                        VALUES ("${data[i][0]}", "${data[i][1]}")`;
            db.serialize(() => {
                db.run(query, (err) => {
                    if (err) throw err;
                });
            });
        }
    }
}

SeedData.dataSeed()