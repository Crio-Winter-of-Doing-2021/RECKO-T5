const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')
const Journal = require('../models/journal')

const updateJournalDatabase = () => {
  try{
    const xero_journals = XERO.getAllJournals()
    const quickbooks_journals = QUICKBOOKS.getAllJournals()
    const dbs = Promise.all([xero_journals, quickbooks_journals]).then(async ([x, q]) => {
      const allJournals = [...x, ...q]
      // save these to database.
      try{
        const saveEntries = await Journal.insertMany(allJournals)
        // console.log(saveEntries)
      }catch(e){
        if(e.code === 11000){
          console.log("duplicate document")
        }else
          console.log(e)
      }
      console.log(allJournals.length)
    })
  }catch(e){
    console.log(e)
    throw e
  }
  
} 

const scheduleJobForJournals  = () => {
  // 1 hr in milliseconds
  console.log("saving journals to database every 1 hr")
  const scheduleTime =  60*60*1000
  // initial call when server starts
  updateJournalDatabase()
  setInterval(()=>{
    updateJournalDatabase()
  },scheduleTime)
}

module.exports = scheduleJobForJournals