const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

module.exports = {
    verifyToken: function(req, res, next){
        jwt.verify(req.headers.token, JWT_SECRET, (err, decoded) => {
            if (err){
                console.log('Authorization failed', err);
                next(err);
            } else {
                req.userid = decoded.id;
                next();
            };
           
        });
    }
}