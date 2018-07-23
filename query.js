const db = require('./db')

// NUMBER 1
function number1() {
    let query = `select name,location,grade_current, COUNT(*) AS totalVote from Politicians inner join Votes on 
                 Politicians.politicianId = Votes.politicianId
                 where grade_current < 9
                 group by name
                 order by totalVote`

    db.all(query, function(err,data){
        if(err) throw err
        console.log(data);
    })  
}

// NUMBER 2
function number2() {
    let query = `select totalVote,name as PoliticianName,first_name || " " || last_name AS voterName,gender from Votes,
                 (select Politicians.politicianId,name,COUNT(*) AS totalVote from Politicians inner join Votes on 
                 Politicians.politicianId = Votes.politicianId
                 group by name
                 order by totalVote DESC
                 limit 3) as data1
                 LEFT join Voters on
                 Votes.voterId = Voters.voterId 
                 WHERE Votes.politicianId = data1.politicianId`

    db.all(query, function(err,data){
        if(err) throw err
        console.log(data);
    })  
}

// NUMBER 3
function number3() {
    let query = `select count(*) as totalVote,first_name || " " || last_name AS name,gender,age from Voters inner join Votes on
                 Voters.voterId = Votes.voterId
                 group by name
                 having totalVote > 1
                 order by totalVote desc`


    db.all(query, function(err,data){
        if(err) throw err
        console.log(data);
    }) 
}

number1()
number2()
number3()