-- select * from task
-- where starttime >= $1 and starttime < $2 and userid = $3;
select t.taskid, t.taskname, t.duedate, t.starttime, t.description, t.completed, t.createdat, t.color, t.isrecurring, t.userid, t.duration, 
json_agg(
    json_build_object(
    'checklistitemid', c.checklistitemid,
    'content', c.content,
    'createdat', c.createdat,
    'taskid', c.taskid,
    'completed', c.completed
    )
) as checkItems,
json_agg(
    json_build_object(
        'commentid', co.commentid,
    'content', co.content,
    'createdat', co.createdat,
    'taskid', co.taskid,
    'userid', co.userid
    )
) as comments
from task as t
left join checklistitem as c on c.taskid = t.taskid 
left join comments as co on co.taskid = t.taskid 
where t.starttime >= $1 and t.starttime < $2 and t.userid = $3
group by t.taskid