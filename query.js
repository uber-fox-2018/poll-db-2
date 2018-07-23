//==================== Release 0 ke 1 ============================


/*
SELECT politicians.name, location, grade_current, count(votes.voterId) as totalVote 
FROM politicians 
JOIN votes 
  ON politicians.id = votes.politiciansId 
Group by politicians.name HAVING grade_current < 9 ORDER BY totalVote 

*/

//==================== Release 0 ke 2 ===========================


/*
WITH temp_query AS (
	SELECT politicians.id as tempId, name, count(votes.politiciansId) as totalVote 
	FROM politicians 
	JOIN votes 
	   ON politicians.id = votes.politiciansId 
	GROUP BY name 
	ORDER BY totalVote DESC
)

SELECT temp_query.name as politicianName, temp_query.totalVote,voters.first_name||' '||voters.last_name as full_name, gender, votes.politiciansId 
FROM voters 
JOIN votes 
 ON voters.id = votes.voterId 
JOIN temp_query 
 ON tempId = votes.politiciansId 
GROUP BY full_name 
ORDER BY totalVote DESC

*/


//==================== Release 0 ke 3 ================================

/*
SELECT COUNT(votes.voterId) as totalVotes, voters.first_name||' '||voters.last_name as full_name, gender, age 
FROM votes 
JOIN voters 
 ON votes.voterId = voters.id 
GROUP BY full_name 
HAVING totalVotes > 1 
ORDER BY totalVotes DESC 

*/

