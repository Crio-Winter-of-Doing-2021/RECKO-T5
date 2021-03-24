const JournalController = require('../controllers/journal')
const router = require('express').Router()

router.get('/journal', JournalController.getJournals)


module.exports = router