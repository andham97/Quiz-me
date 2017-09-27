var router = require('express').Router();
var Quiz = require('../../../internal/models/quiz');

router.get('/', function(req, res){
    Quiz.find({_id: req.query.id}, function(err, quiz){
        if(err){
            console.error(err);
            res.status(307).redirect("/attend");
        }
        else {
            if(quiz.length == 0)
                res.status(307).redirect("/attend");
            else {
                if(new Date(quiz[0].time).getTime() < new Date().getTime())
                    res.status(307).redirect("/attend");
                else
                    res.render('attend/quiz');
            }
        }
    });
});

module.exports = router;