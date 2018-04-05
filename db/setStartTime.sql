update task
set starttime = $1,
    duration = $2
where taskid = $3;