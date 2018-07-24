const db = require('./db')
const fs = require('fs')
var voters = fs.readFileSync('voters.csv').toString().split('\n')
var politicians = fs.readFileSync('politicians.csv').toString().split('\n')
var votes = fs.readFileSync('votes.csv').toString().split('\n')

// 1. Berapa banyak vote yang diterima Politicians yang memiliki grade di bawah 9 (gunakan field grade_current)? Tampilkan nama politician, lokasi, grade_current dan jumlah vote-nya. Urutkan berdasarkan grade yang paling kecil.
function lessNine(){
    let query = `SELECT name, location, grade_current ,COUNT(*) as totalVote FROM politicians join votes
    on politicians.id = votes.politician_id
    where grade_current < 9
    group by name
    order by grade_current asc`
    db.all(query,function(err,data){
        console.table(data)
    })
}
lessNine()

