delete from checklistitem
where checklistitemid = $1
returning *;