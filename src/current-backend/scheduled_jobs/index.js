const scheduleJobForJournals = require('./journal')
const scheduleJobForAccounts = require('./account')
const scheduleJobForEmployee = require('./employee')

const Scheduler = () => {
  scheduleJobForAccounts()
  scheduleJobForJournals()
  scheduleJobForEmployee()
}

module.exports = Scheduler