var router = require('express').Router();

router.use('/quiz', require('./api/quiz'));
router.use('/auth', require('./api/auth'));
router.use('/time', require('./api/time'));

module.exports = router;