var router = require('express').Router();

router.get('/milli', function(req, res){
    res.json(new Date().getTime());
});

router.get('/', function(req, res){
    res.json(new Date());
});

module.exports = router;