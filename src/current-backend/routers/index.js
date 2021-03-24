const router = require('express').Router()
const OAuthRoutes = require('./oauth')
const JournalRoutes = require('./journal')

router.use('/api', [OAuthRoutes, JournalRoutes])

module.exports = router


