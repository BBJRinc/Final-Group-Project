module.exports = {
    getDay: function(req, res){
        let startOfDay = Number(req.params.day);
        let endOfDay = startOfDay + (1*24*60*60*1000);
        let userid = req.userid;
        req.app.get('db').getDay([startOfDay, endOfDay, userid]).then(resp => {
            let taskArray = resp.map(task => {
                return req.app.get('db').getCheckItem([task.taskid]).then(items => {
                    task.checkItems = items
                    return task
                });
            });
            Promise.all(taskArray).then(values => {
                let commentArray = values.map(task => {
                   return req.app.get('db').getComments([task.taskid]).then(comments => {
                        task.comments = comments
                        return task
                    });
                });
                Promise.all(commentArray).then(completedTasks => {
                    res.status(200).send(completedTasks);
                });
            });
        });
    }
}