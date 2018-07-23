const fs = require('fs')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('.')


class Vote{
    
    //Release 0
    static byGrade(){
        let query = `select Politicians.name,Politicians.location,Politicians.grade_current,count(Votes.voterId) as totalVote from Voters
        join Votes on Voters.id = Votes.voterId
        join Politicians on Politicians.id = Votes.politicianId
        where Politicians.grade_current < 9
        group by Politicians.name
        order by Politicians.grade_current asc`

        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }
    
    //Release 1
    static politicianVoter(){
        let query = `select totalVote,Politicians.name,Voters.first_name ||" "|| Voters.last_name as voterName, Voters.gender from Voters,
        (select count(Votes.voterId) as totalVote,Politicians.name as politicianName, Politicians.id as politicianID from Politicians
        join Votes on Votes.politicianId = Politicians.id
        join Voters on Votes.voterId = Voters.id
        group by Politicians.name
        order by totalVote desc
        limit 3) as dataPoll
        join Votes on Voters.id = Votes.voterId
        where Votes.politicianId = dataPoll.politicianID
        order by totalVote desc`

        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }

    static fraudVoters(){
        let query = `select count(Votes.voterId) as totalVotes, Voters.first_name ||" "|| Voters.last_name as name, Voters.gender, Voters.age from Voters
        join Votes on Voters.id = Votes.voterId
        where Votes.voterId > 1
        group by name
        order by totalVotes desc`

        db.all(query,function(err,data){
            if(err){
                throw err
            }
            console.log(data)
        })
    }
}

module.exports = Vote