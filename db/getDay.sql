select * from task
where starttime >= $1 and starttime < $2 and userid = $3;