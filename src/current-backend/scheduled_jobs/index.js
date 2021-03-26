const scheduleJobForJournals = require('./journal')
const scheduleJobForAccounts = require('./account')

const Scheduler = () => {
  scheduleJobForAccounts()
  scheduleJobForJournals()
}

module.exports = Scheduler