var router = require('express').Router();
var Quiz = require('../../../internal/models/quiz');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/join', function(req, res){
    var q = {
        _id: ObjectId(req.body.id)
    };
    Quiz.find(q, function(err, quiz){
        if(err) {
            res.status(500).json(err);
            console.error(err);
        }
        else {
            if(quiz.length == 0) {
                res.status(400).send("Quiz not found");
                console.error("Quiz not found");
            }
            else {
                quiz = quiz[0];
                for(var i = 0; i < quiz.score.length; i++){
                    if(quiz.score[i].nick == req.body.nick){
                        res.status(400).send("Nick already in use");
                        return;
                    }
                }
                req.session.nick = req.body.nick;
                req.session.save();
                quiz.score.push({nick: req.body.nick, score: 0});
                quiz.save();
                res.send("success");
            }
        }
    });
});

router.post('/answer', function(req, res){
    var q = {
        _id: ObjectId(req.body.id)
    };
    Quiz.find(q, function(err, quiz){
        if(err) {
            res.status(500).json(err);
            console.error(err);
        }
        else {
            if(quiz.length == 0) {
                res.status(400).send("Quiz not found");
                console.error("Quiz not found");
            }
            else {
                quiz = quiz[0];
                var i;
                for(i = 0; i < quiz.score.length; i++){
                    if(quiz.score[i].nick == req.session.nick){
                        for(var j = 0; j < quiz.questions[req.body.curQuestion].correct.length; j++){
                            if(quiz.questions[req.body.curQuestion].correct[j] == req.body.answer){
                                quiz.score[i].score++;
                                break;
                            }
                        }
                    }
                }
                Quiz.findOneAndUpdate({_id: ObjectId(quiz._id)}, { score: quiz.score }, function(err){
                    if(err)
                        res.status(500).send(err);
                    else
                        res.send("success");
                });
            }
        }
    })
});

module.exports = router;