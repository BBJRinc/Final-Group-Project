const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , jwt = require('jsonwebtoken')
    , app = express()
    , tdCtrl = require('./taskDetailsController')
    , userCtrl = require('./userController')
    , taskCtrl = require('./taskController')
    , dayCtrl = require('./dayController')
    , tokenAuth = require('./tokenAuth');
app.use(bodyParser.json());
require('dotenv').config();
const { CONNECTION_STRING, AUTH0_CLIENT_SECRET, JWT_SECRET, SERVER_PORT } = process.env;
let db = null;
//function to filter which routes recieve the verifyToken middleware
const unless = function(path, middleware){
    return function(req, res, next){
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

//invoking unless filter then verifyToken middleware, excludes the auth route as a user will not yet have a token to verify
app.use(unless('/api/auth', tokenAuth.verifyToken));


massive(CONNECTION_STRING).then(indb => {
    console.log('DB connected')
    app.set('db', indb);
})

//Auth login endpoints
app.post('/api/auth', (req, res, next) => {
    // console.log('req.token index.js: ', req.body)
    jwt.verify(req.body.token, AUTH0_CLIENT_SECRET, (err, decoded) => {
        let db = app.get('db');
        if (err) {
            console.log('Authorization failed', err);
            next(err);
        }
        let { given_name, family_name, email, sub } = decoded;
        db.checkForUser([sub]).then((resp) => {
            let user = resp[0];
            let id = '';
            if (!user) {
                db.createUser([given_name, family_name, email, sub]).then(resp => {
                    id = resp[0].userid;
                    let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
                    console.log('token after create user: ', token)
                    res.status(200).send(token);
                });
            }
            else {
                id = user.userid;
                let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
                console.log('token if user exists: ', token)
                res.status(200).send(token);
            }
        })
    })
})

//task endpoints
app.get('/api/unscheduled', taskCtrl.getUnscheduled);
app.delete('/api/unscheduled/:taskid', taskCtrl.deleteUnscheduled);
app.get('/api/inprogress', taskCtrl.getInProgress);
app.delete('/api/inprogress/:taskid', taskCtrl.deleteOngoing);

//task details endpoints
app.post('/api/checklist/:taskid', tdCtrl.addCheckItem);
app.put('/api/checklist/:itemid', tdCtrl.updateCheckItem);
app.delete('/api/checklist/:itemid', tdCtrl.deleteCheckItem);
app.post('/api/comment/:taskid', tdCtrl.addComment);
app.put('/api/comment/:commentid', tdCtrl.editComment);
app.delete('/api/comment/:commentid', tdCtrl.deleteComment);
app.put('/api/task/:taskid', tdCtrl.editTask);
app.post('/api/task', tdCtrl.addTask);

//user endpoints
app.get('/api/user', userCtrl.getUser);

//day endpoints
app.get('/api/day/:day', dayCtrl.getDay);

app.post('/api/testtoken', (req, res) => {
    console.log(req.userid);
})




app.listen(SERVER_PORT, () => {
    console.log('Server is listening on port ' + SERVER_PORT);
});


