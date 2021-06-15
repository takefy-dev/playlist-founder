const router = require('express').Router();
const spotify = require('./spotify');
const deezer = require('./deezer');

router.use('/spotify', spotify);
router.use('/deezer', deezer)

module.exports = router