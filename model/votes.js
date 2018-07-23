const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database');

class Vote{

    static countVote(name){
        let query = `SELECT COUNT(voterId) as totalVote, Politicians.name as name 
        FROM Votes JOIN Politicians ON Votes.politicianId = Politicians.id
        WHERE Politicians.name = "${name}"
        GROUP BY Politicians.name`
        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }

    static countVoteLikeName(name){
        let query = `SELECT Politicians.name as name, COUNT(voterId) as totalVote
        FROM Votes JOIN Politicians ON Votes.politicianId = Politicians.id
        WHERE Politicians.name LIKE "${name}%"
        GROUP BY Politicians.name`
        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }

    static mostVotes(num){
        let query = `SELECT COUNT(voterId) as totalVote,Politicians.name,Politicians.party,Politicians.location
        FROM Votes JOIN Politicians ON Votes.politicianId = Politicians.id
        GROUP BY Politicians.name
        ORDER BY totalVote DESC
        LIMIT "${num}"`
        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }

    static politicianVoters(name){
        let query = `select Voters.first_name, Voters.last_name, Voters.gender, Voters.age from Voters 
        join Votes on Voters.id = Votes.voterId
        join Politicians on Politicians.id = Votes.politicianId
        where Politicians.name = "${name}"`
        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }

}

// Vote.countVote('Olympia Snowe')
// Vote.countVoteLikeName("Adam")
// Vote.mostVotes(3)
// Vote.politicianVoters('Olympia Snowe')

module.exports = Vote