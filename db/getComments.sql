select * from comments 
where taskid = $1
order by createdat desc;