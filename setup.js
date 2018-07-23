var sqlite = require('sqlite3').verbose()
var file = 'pollDB.db'
var db = new sqlite.Database(file)
var fs = require('fs')


function release_0_1() {
	let query = "SELECT name,location,grade_current,COUNT(*) AS totalVote FROM votes  JOIN politicians ON votes.politician_id = politicians.id WHERE grade_current < 9 GROUP BY name ORDER BY grade_current ASC"
	db.all(query,function(err,rows) {
		console.log(rows)
	})
}

function release_0_2() {
	let query =
	`SELECT totalVote,politiciansCupu.name AS politicianName,first_name ||' '||last_name AS voterName,gender 
		FROM votes
		JOIN politiciansCupu
		ON votes.politician_id = politicians.id 
		JOIN voters
		ON votes.voter_id = voters.id
		ORDER BY totalVote DESC`

	db.all(query,function(err,rows) {
		console.log(rows)
	})	
}

function release_0_3() {
	let query = 
	`SELECT  COUNT(*)AS totalVote,first_name||' '||last_name AS name,gender,age 
		FROM votes 
		JOIN voters
		ON votes.voter_id = voters.id
		GROUP BY first_name ||' '||last_name 
		HAVING totalVote>1
		ORDER BY totalVote DESC`

	db.all(query,function(err,rows) {
		console.log(rows)
	})	
}


// TEST CASES
//release_0_1()
//release_0_2()
release_0_3()