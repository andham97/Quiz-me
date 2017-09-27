var router = require('express').Router();

router.get('*', function(req, res, next){
    if(req.url.indexOf("dashboard") > -1 && !req.session.user_id){
        res.redirect(307, '/login');
        return;
    }
    next();
});

router.use('/login', require('./frontend/login'));
router.use('/dashboard', require('./frontend/dashboard'));
router.use('/attend', require('./frontend/attend'));

router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;