const JournalController = require('../controllers/journal')
const router = require('express').Router()
const {isUserLoggedIn} = require('../middleware/user')

router.get('/journal', isUserLoggedIn, JournalController.getJournals)
router.get('/v2/journal', JournalController.getJournalsV2)


module.exports = router