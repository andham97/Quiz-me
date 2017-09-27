var router = require('express').Router();
var User = require('../../internal/models/user');
var url = require('url');

router.get('/logout', function(req, res){
    req.session.user_id = undefined;
    req.session.save();
    res.send("");
});

router.get('/', function(req, res){
    var username = req.query.username;
    var password = req.query.password;

    User.find({username: username, password: password}, function(err, users){
        if(err){
            console.error(err);
            res.status(500).send(err);
            return;
        }
        if(users.length == 0){
            res.status(400).send("Wrong username/password");
            return;
        }
        req.session.user_id = users[0]._id;
        req.session.save();
        res.status(200).send("success");
    });
});

router.post('/', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    User.find({username: username}, function(err, users){
        if(err){
            console.error(err);
            res.status(500).send(err);
            return;
        }
        if(users.length != 0){
            res.status(400).send("User already exists");
            return;
        }
        User.create({username: username, password: password}, function(err, user){
            if(err){
                console.error(err);
                res.status(500).send(err);
                return;
            }
            res.status(200).send("success");
        });
    });
});

module.exports = router;