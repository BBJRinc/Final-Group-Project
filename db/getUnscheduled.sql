-- select * from task where userid = $1 and starttime is null;
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
where t.userid = $1 and t.starttime is null
group by t.taskid