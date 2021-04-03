const {getAllJournals} = require('./journal')
const {getAllAccounts, createAccount} = require('./account')
const {getAllEmployees} = require('./employee')


module.exports = {
  getAllJournals,
  getAllAccounts,
  createAccount,
  getAllEmployees
}