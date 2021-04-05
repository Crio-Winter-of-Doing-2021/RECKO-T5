const xero = require('./init')
const {setXeroTokenSet, generateNewXeroToken} = require('./token')
const {getAllAccounts, getAnAccount, createAccount} = require('./account')
const {getAllEmployees } = require('./employee')
const {getAllJournals} = require('./journal')


module.exports = {
  xero, 
  setXeroTokenSet,
  generateNewXeroToken,
  getAllAccounts,
  getAnAccount,
  createAccount,
  getAllEmployees,
  getAllJournals
}