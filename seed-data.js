/*
1. SELECT name, location,  grade_current, COUNT(name) AS totalVote 
   FROM Votes
   INNER JOIN  Politicians
   ON Politicians.politicianId = Votes.politicianId
   WHERE grade_current < 9
   GROUP BY name
   ORDER BY grade_current


2. `SELECT Politicians.id,Politicians.name, Politicians.location,count(votes.politicianId) as totalVotes 
    FROM Politicians 
    LEFT JOIN Votes 
    ON Politicians.id = Votes.politicianId
    GROUP BY Politicians.name  
    ORDER BY totalVotes desc  limit 3
         SELECT data1.totalVotes, data1.name as PoliticiansName,first_name||' '||last_name as VotersName,Voters.gender 
         FROM data1
         JOIN Votes 
         ON data1.id = Votes.politicianId 
         LEFT JOIN Voters
          ON Voters.id = votes.voterId 
         ORDER BY totalVotes desc 

3. SELECT COUNT(Votes.voterId) as totalVote , first_name||' '||last_name as name,gender,age 
    FROM Voters 
    INNER JOIN votes 
    on Voters.id=Votes.VoterId 
    GROUP BY name having totalVote >1 
    ORDER BY totalVote desc

   */ 
