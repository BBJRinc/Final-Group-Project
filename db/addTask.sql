insert into task 
(taskname, userid)
VALUES
($1, $2)
returning *;