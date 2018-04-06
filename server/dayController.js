module.exports = {
    getDay: function(req, res){
        console.log('Get day hit for:', req.params.day)
        let startOfDay = Number(req.params.day);
        let endOfDay = startOfDay + (1*24*60*60*1000);
        let userid = req.userid;
        console.log('req.userid:', req.userid);
        console.log('endOfDay:', endOfDay);
        console.log('startOfDay:', startOfDay);
        
        
        req.app.get('db').getDay([startOfDay, endOfDay, userid]).then(resp => {
            console.log('db response:', resp);
            res.status(200).send(resp);
        });
    }
}