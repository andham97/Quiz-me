var router = require('express').Router();

router.use('/quiz', require('./attend/quiz'));
router.use('/score', require('./attend/score'));

router.get('/', function(req, res){
    res.render('attend');
});

module.exports = router;