var router = require('express').Router();

router.use('/quiz', require('./dashboard/quiz'));
router.get('/', function(req, res){
    res.render('dashboard');
});

module.exports = router;