require('dotenv').config()
const {setXeroTokenSet} = require('./token')
const xero = require('./init')
const { ManualJournal, ManualJournals } = require('xero-node')
const xeroTenantId = process.env.XERO_TENANT_ID

const getAllJournals = async () => {
  try {
    await setXeroTokenSet()
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

const getAllManualJournals = async () => {
  try {
    await setXeroTokenSet()
    const manualJournals = await xero.accountingApi.getManualJournals(xeroTenantId);
    return manualJournals
  } catch (e) {
    console.log(e)
    throw e
  }
}
const createManualJournals = async (manualJournals) => {
  try{
    await setXeroTokenSet()

    const newManualJournal = await xero.accountingApi.createManualJournals(xeroTenantId, manualJournals)
    const newManualJournalID =  newManualJournal.body.manualJournals[0].manualJournalID
    return newManualJournalID
  }catch(e){
    console.log(e)
    throw e
  }

}
module.exports = {
  getAllJournals,
  getAllManualJournals,
  createManualJournals
}