const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')
const Journal = require('../models/journal')

const updateJournalDatabase = (uid) => {
  try{
    const xero_journals = XERO.getAllJournals(uid)
    const quickbooks_journals = QUICKBOOKS.getAllJournals(uid)
    return Promise.all([xero_journals, quickbooks_journals]).then(async ([x, q]) => {
      const allJournals = [...x, ...q]
      // save these to database.
      try{
        const saveEntries = await Journal.insertMany(allJournals)
        // console.log(saveEntries)
      }catch(e){
        if(e.code === 11000){
          console.log("duplicate documents")
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

// const scheduleJobForJournals  = async (uid) => {
//   // 1 hr in milliseconds
//   console.log("saving journals to database every 4 hr for userId: ", uid)
//   const scheduleTime =  4*60*60*1000
//   // initial call when server starts
//   await updateJournalDatabase(uid)
//   setInterval(()=>{
//     updateJournalDatabase(uid)
//   },scheduleTime)
// }

module.exports = updateJournalDatabase