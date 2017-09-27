var router = require('express').Router();
var Quiz = require('../../internal/models/quiz');

router.use('/live', require('./quiz/live'));

router.get('/', function(req, res){
    var q = req.query;
    if(q.author)
        q.author = req.session.user_id;
    Quiz.find(req.query, function(err, quiz){
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        else if(!q.author){
            for(var i = 0; i < quiz.length; i++){
                for(var j = 0; j < quiz[i].questions.length; j++){
                    delete quiz[i].questions[j].correct;
                }
            }
            res.json(quiz);
        }
        else
            res.json(quiz);
    });
});

router.post('/', function(req, res){
    req.body.author = req.session.user_id;
    req.body.score = [];
    Quiz.create(req.body, function(err, quiz){
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send("success");
    })
});

module.exports = router;