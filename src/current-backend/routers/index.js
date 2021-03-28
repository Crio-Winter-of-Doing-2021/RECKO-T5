const router = require('express').Router()
const OAuthRoutes = require('./oauth')
const JournalRoutes = require('./journal')
const AccountRoutes = require('./account')
const EmployeeRoutes = require('./employee')
const UserRoutes = require('./user')

router.use('/api', [OAuthRoutes, JournalRoutes, AccountRoutes, EmployeeRoutes, UserRoutes])

module.exports = router


