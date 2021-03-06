const moment = require('moment');
const DAY = 24*60*60*1000;

module.exports={
    addCheckItem: function(req, res){
        const taskid = Number(req.params.taskid)
        let item = [
            taskid,
            req.body.content
        ];
        req.app.get('db').addCheckItem(item).then(() => {
            req.app.get('db').getChecklist([taskid]).then(resp => {
                res.status(200).send(resp);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));

    }, 

    updateCheckItem: function(req, res){
        if (req.body.checklistItems.length){
            let checklist = req.body.checklistItems.map((item) => {
                let checkItem = [
                    item.checklistitemid,
                    item.content,
                    item.completed
                ];
                return req.app.get('db').updateCheckItem(checkItem).then(resp => {
                    return resp[0];
                }).catch(err => console.log(err));
            });
            Promise.all(checklist).then(results => {
                res.status(200).send(results);
            });
        }
    },

    deleteCheckItem: function(req, res){
        let itemid = Number(req.params.itemid);
        req.app.get('db').deleteCheckItem([itemid]).then(resp => {
            req.app.get('db').getChecklist([resp[0].taskid]).then(checklist => {
                res.status(200).send(checklist);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    addComment: function(req, res){
        // console.log('add comment endpoint hit')
        const taskid = Number(req.params.taskid);
        let comment = [
            taskid,
            req.userid,
            req.body.content
        ];
        req.app.get('db').addComment(comment).then(() => {
            req.app.get('db').getComments([taskid]).then(resp => {
                res.status(200).send(resp);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },
    
    editComment: function(req, res){
        let commentid = Number(req.params.commentid);
        let comment = [
            commentid,
            req.body.content
        ];
        req.app.get('db').updateComment([comment]).then(resp => {
            req.app.get('db').getComments([resp[0].taskid]).then(comments => {
                res.status(200).send(comments);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    deleteComment: function(req, res){
        let commentid = Number(req.params.commentid);
        req.app.get('db').deleteComment([commentid]).then(resp => {
            req.app.get('db').getComments([resp[0].taskid]).then(coments => {
                res.status(200).send(comments);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    editTask: function(req, res){
        const taskid = Number(req.params.taskid);
        console.log(req.body.color)
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
        }).catch(err => console.log(err));
    },

    addTask: function(req, res){
        let task = [
            req.body.taskname,
            req.userid
        ];
        req.app.get('db').addTask(task).then(resp => {
            res.status(200).send(resp);
        }).catch(err => console.log(err));
    },

    setStartTime: function(req, res){
        let taskid = Number(req.params.taskid);
        let task = [
            req.body.starttime,
            req.body.duration,
            taskid
        ];
        console.log('taskid:', taskid);
        console.log('task:', task);
        
        req.app.get('db').setStartTime(task).then(() => {
            
            // Todays Tasks
            let endOfDay = req.body.day + DAY;
            console.log("start of day " + req.body.day + "End of Day " + endOfDay )
            let day = [
                req.body.day,
                endOfDay,
                req.userid
            ]
            req.app.get('db').getDay(day).then(resp => {
                console.log('Response from db:', resp);
                res.status(200).send(resp);
            });
        }).catch((err) => console.log(err))
    }
}