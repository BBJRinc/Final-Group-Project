module.exports={
    addCheckItem: function(req, res){
        const taskid = Number(req.params.taskid)
        console.log(typeof taskid);
        let item = [
            taskid,
            req.body.content
        ];
        req.app.get('db').addCheckItem(item).then(() => {
            req.app.get('db').getChecklist([taskid]).then(resp => {
                res.status(200).send(resp);
            });
        });

    }, 

    addComment: function(req, res){
        console.log('add comment endpoint hit')
        const taskid = Number(req.params.taskid);
        let comment = [
            taskid,
            req.body.userid,
            req.body.content
        ];
        req.app.get('db').addComment(comment).then(() => {
            req.app.get('db').getComments([taskid]).then(resp => {
                res.status(200).send(resp);
            });
        });
    }, 

    editTask: function(req, res){
        const taskid = Number(req.params.taskid);
        let task = [
            taskid,
            req.body.taskname,
            req.body.duedate,
            req.body.starttime,
            req.body.description,
            req.body.completed,
            req.body.color,
            req.body.isrecurring,
            req.body.duration
        ];
        req.app.get('db').updateTask(task).then(resp => {
            res.status(200).send(resp);
        });
    },

    addTask: function(req, res){
        let task = [
            req.body.taskname,
            req.body.duedate,
            req.body.starttime,
            req.body.description,
            req.body.completed,
            req.body.color,
            req.body.isrecurring,
            req.body.duration,
            req.body.userid
        ];
        req.app.get('db').addTask(task).then(resp => {
            res.status(200).send(resp);
        });
    }
}