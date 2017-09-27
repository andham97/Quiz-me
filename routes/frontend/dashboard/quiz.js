var router = require('express').Router();

router.get('/new', function(req, res){
    res.render('quiz/new');
});

module.exports = router;