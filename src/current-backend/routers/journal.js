const JournalController = require('../controllers/journal')
const router = require('express').Router()
const {isUserLoggedIn} = require('../middleware/user')

router.get('/journal', isUserLoggedIn, JournalController.getJournals)


module.exports = router