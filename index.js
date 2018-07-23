/*
RELEASE 1
No 1 
select Politicians.name, Politicians.location,Politicians.grade_current,count(votes.politicianId) from Politicians inner join Votes on Politicians.id=Votes.politicianId where grade_current < 9 group by Politicians.name  order by grade_current asc limit 3

No 2

with data1 as (select Politicians.id,Politicians.name, Politicians.location,count(votes.politicianId) as totalVotes from Politicians  left join Votes on Politicians.id=Votes.politicianId group by Politicians.name  order by totalVotes desc  limit 3)
select data1.totalVotes, data1.name as PoliticiansName,first_name||' '||last_name as VotersName,Voters.gender from data1  join Votes on data1.id = Votes.politicianId left join Voters on Voters.id= votes.voterId order by totalVotes desc 

No 3
select count(Votes.voterId) as totalVote , first_name||' '||last_name as name,gender,age from Voters inner join votes on Voters.id=Votes.VoterId group by name having totalVote >1 order by totalVote desc 


*/

