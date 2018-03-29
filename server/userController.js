module.exports = {
    getUser: function(req, res){
        req.app.get('db').getUser([userid]).then(resp => {
            res.status(200).send(resp[0]);
        })
    }
}