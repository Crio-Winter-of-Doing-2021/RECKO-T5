const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')
const Account = require('../models/account')

const updateAccountDatabase = (uid) => {
  try{
    const q_acc = QUICKBOOKS.getAllAccounts(uid)
    const x_acc = XERO.getAllAccounts(uid)
    return Promise.all([q_acc, x_acc]).then((async ([x,y]) => {
      const allAccounts = [...x, ...y]
      try{
        const saveEntries = await Account.insertMany(allAccounts)
        // console.log(saveEntries)
      }catch(e){
        if(e.code === 11000){
          console.log("duplicate document")
        }else
          console.log(e)
      }
      console.log(allAccounts.length)
    }))
  }catch(e){
    console.log(e)
  }
  
} 

// const scheduleJobForAccounts  = async (uid) => {
//   // 1 hr in milliseconds
//   console.log("saving accounts to database every 4 hr for userId ", uid)
//   const scheduleTime =  4*60*60*1000
//   // initial call when server starts
//   await updateAccountDatabase(uid)
//   setInterval(() => {
//     updateAccountDatabase(uid)
//   },scheduleTime)
// }

module.exports = updateAccountDatabase