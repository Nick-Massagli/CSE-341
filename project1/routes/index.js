const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));
router.use('/character', require('./character'));
router.use('/class', require('./class'));
module.exports = router;