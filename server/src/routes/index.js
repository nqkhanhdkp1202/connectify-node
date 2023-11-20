const router = require('express').Router();

router.use('/auth', require('./authRoute'));
router.use('/feed', require('./feedRoute'));

module.exports = router;