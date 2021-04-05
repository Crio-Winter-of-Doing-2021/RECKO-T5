require('dotenv').config()
const {setXeroTokenSet} = require('./token')
const xero = require('./init')


const getAllJournals = async (uid) => {
  try {
    await setXeroTokenSet(uid)
    // sends the journal created/modified after 1980
    const tenants = await xero.updateTenants()
    const response = await xero.accountingApi.getJournals(tenants[0].tenantId, new Date("1980"));
    const journals = response.body.journals
    const mappedData = []
    journals.map(journal => {
      journal.journalLines.map(jl => {
        const record = {
          jid : jl.journalLineID,
          provider:"XERO",
          accountName : jl.accountName,
          accountId : jl.accountCode,
          amount : jl.grossAmount,
          date : journal.journalDate,
          type: jl.netAmount > 0 ? "DEBIT" : "CREDIT"
        }
        mappedData.push(record)
      })
    })
    return mappedData
  } catch (e) {
    console.log(e)
    throw e
  }
}



module.exports = {
  getAllJournals
}