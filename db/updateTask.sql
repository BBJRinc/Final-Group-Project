update task 
set taskname = $2,
    duedate = $3,
    starttime = $4,
    description = $5,
    completed = $6,
    color = $7,
    isrecurring = $8,
    duration = $9
where taskid = $1
returning *;