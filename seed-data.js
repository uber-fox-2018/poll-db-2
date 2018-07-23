const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

function seedData() {
  const db = new sqlite3.Database('pooldb');
  const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n');
  for(let index = 0; index < politicians.length; index++) {
    politicians[index] = politicians[index].split(',');
  }

  const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n');
  for(let index = 0; index < voters.length; index++) {
    voters[index] = voters[index].split(',');
  }

  const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n');
  for(let index = 0; index < votes.length; index++) {
    votes[index] = votes[index].split(',');
  }

  for(let index = 1; index < politicians.length; index++) {
    let name = politicians[index][0];
    let party = politicians[index][1];
    let location = politicians[index][2];
    let grade_current = politicians[index][3];
    let insertPoliticians = `INSERT INTO politicians (name, party, location, grade_current)
    VALUES ("${name}", "${party}", "${location}", ${grade_current});`;
    
    // db.serialize(() => db.run(insertPoliticians));
    
  }

  for(let index = 1; index < voters.length; index++) {
    let first_name = voters[index][0];
    let last_name = voters[index][1];
    let gender = voters[index][2];
    let age = voters[index][3];
    let insertVoters = `INSERT INTO voters (first_name, latt_name, gender, age) 
    VALUES ("${first_name}", "${last_name}", "${gender}", ${age});`;
    
    // db.serialize(() => db.run(insertVoters));
    
  }

  for(let index = 1; index < votes.length; index++) {
    let voter_id = votes[index][0];
    let politicians_id = votes[index][1];
    let insertVotes = `INSERT INTO voting (voter_id, politician_id)
    VALUES (${voter_id}, ${politicians_id});`;

    // db.serialize(() => db.run(insertVotes));
    
  }

}

seedData(); 
