module.exports = {
    getDay: function(req, res){
        let startOfDay = Number(req.params.day);
        let endOfDay = startOfDay + (1*24*60*60*1000);
        let userid = req.userid;
        req.app.get('db').getDay([startOfDay, endOfDay, userid]).then(resp => {
            res.status(200).send(resp);
        });
    }
}