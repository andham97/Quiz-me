var router = require('express').Router();

router.get('/', function(req, res){
    res.render('attend/score');
});

module.exports = router;