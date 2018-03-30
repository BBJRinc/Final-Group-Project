module.exports = {
    getUser: function(req, res){
        let userid = req.userid;
        req.app.get('db').getUser([userid]).then(resp => {
            res.status(200).send(resp[0]);
        })
    }
}