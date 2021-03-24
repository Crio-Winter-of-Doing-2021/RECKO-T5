const xero = require('./init')
const {setXeroTokenSet, generateNewXeroToken} = require('./token')
const {getAllAccounts, getAnAccount, createAccount} = require('./account')
const {getAllEmployees,getAnEmployee } = require('./employee')
const {getAllJournals, getAllManualJournals, createManualJournals} = require('./journal')
module.exports = {
  xero, 
  setXeroTokenSet,
  generateNewXeroToken,
  getAllAccounts,
  getAnAccount,
  createAccount,
  getAllEmployees,
  getAnEmployee,
  getAllJournals,
  getAllManualJournals,
  createManualJournals
}