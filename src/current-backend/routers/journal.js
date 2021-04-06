const JournalController = require('../controllers/journal')
const router = require('express').Router()
const {isUserLoggedIn} = require('../middleware/user')
const ScheduleDataSaving = require('../middleware/scheduler')


router.get('/journal', isUserLoggedIn,ScheduleDataSaving,JournalController.getJournals)



module.exports = router