update comments 
set content = $2
where commentid = $1
returning *;