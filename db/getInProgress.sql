select task.taskid, task.taskname,task.duedate, task.starttime, task.description, task.completed, task.createdat, task.color, task.isrecurring, task.userid, task.duration,
coalesce((select json_agg(checklistitem.*)
from checklistitem
where checklistitem.taskid = task.taskid), '{}'::json) as checkItems,
coalesce((select json_agg(comments.*)
from comments
where comments.taskid = task.taskid), '{}'::json) as comments
from task
where task.userid = $1 and task.starttime is not null
order by task.createdat desc