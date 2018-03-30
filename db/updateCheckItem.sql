update checklistitem 
set content = $2,
    completed = $3
where checklistitemid = $1
returning *;
