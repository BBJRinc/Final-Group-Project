delete from comments 
where commentid = $1
returning *;