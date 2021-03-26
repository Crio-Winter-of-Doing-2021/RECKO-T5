const router = require('express').Router()
const OAuthRoutes = require('./oauth')
const JournalRoutes = require('./journal')
const AccountRoutes = require('./account')

router.use('/api', [OAuthRoutes, JournalRoutes, AccountRoutes])

module.exports = router


