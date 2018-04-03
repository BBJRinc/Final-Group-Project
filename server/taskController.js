const db = require('./index.js')
module.exports = {
    getUnscheduled: function(req, res){
        let userId = req.userid;
        req.app.get('db').getUnscheduled([userId]).then(tasks => {
            res.status(200).send(tasks);
        });
    }, 

    getInProgress: function(req, res){
        let userId = req.userid;
        req.app.get('db').getInProgress([userId]).then(tasks => {
            res.status(200).send(tasks);
        });
    }, 

    deleteOngoing: function(req, res){
        let userId = req.userid;
        let id = req.params.taskid;
        req.app.get('db').deleteTask([id]).then(response => {
            req.app.get('db').getInProgress([userId]).then(resp => {
                res.status(200).send(resp)
            })
        });
    }, 

    deleteUnscheduled: function(req, res){
        let userId = req.userid;
        let id = req.params.taskid;
        req.app.get('db').deleteTask([id]).then(response => {
            req.app.get('db').getUnscheduled([userId]).then(resp => {
                res.status(200).send(resp);
            });
        });
    }
}