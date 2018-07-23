const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database')

class Seed{

    static politicians(){
        let dataPolitician = fs.readFileSync('./politicians.csv','utf8').split('\n');
        let array =[]
        let query = `INSERT INTO Politicians(name,party,location,grade_current) Values`
        for(let i = 1; i< dataPolitician.length-1; i++){
            let splitRow = dataPolitician[i].split(',')
            array.push(splitRow)
        }
        db.serialize(function(){
            for(let i = 0; i<array.length; i++){
                db.run(query+`("${array[i][0]}","${array[i][1]}","${array[i][2]}","${array[i][3]}");`)
            }
        })
    }
    
    static voters(){
        let dataVoters = fs.readFileSync('./voters.csv','utf8').split('\n')
        let array = []
        for(let i = 1; i<dataVoters.length-1; i++){
            let splitRow = dataVoters[i].split(',')
            array.push(splitRow)
        }
        db.serialize(function(){
            for(let i = 0; i<array.length; i++){
                db.run(`insert into Voters(first_name,last_name,gender,age)
                Values("${array[i][0]}","${array[i][1]}","${array[i][2]}","${array[i][3]}");`)
            }
        })
    }

    static votes(){
        let dataVotes = fs.readFileSync('./votes.csv','utf8').split('\n')
        let array = []
        for(let i = 1; i<dataVotes.length-1; i++){
            let splitRow = dataVotes[i].split(',')
            array.push(splitRow)
        }
        db.serialize(function(){
            for(let i = 0; i<array.length; i++){
                db.run(`insert into Votes(voterId,politicianId)
                Values("${array[i][0]}","${array[i][1]}");`)
            }
        })
    }
}


// Seed.politicians()
// Seed.voters()
// Seed.votes()
