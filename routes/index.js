const router = require('express').Router();
const playlist = require('./playlist')

router.use('/playlist', playlist);


module.exports = router