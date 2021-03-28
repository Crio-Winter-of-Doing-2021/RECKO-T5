const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')
const Account = require('../models/account')

const updateAccountDatabase = () => {
  try{
    const q_acc = QUICKBOOKS.getAllAccounts()
    const x_acc = XERO.getAllAccounts()
    const accounts = Promise.all([q_acc, x_acc]).then((async ([x,y]) => {
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

const scheduleJobForAccounts  = () => {
  // 1 hr in milliseconds
  console.log("saving accounts to database every 2 hr")
  const scheduleTime =  2*60*60*1000
  // initial call when server starts
  updateAccountDatabase()
  setInterval(()=>{
    updateAccountDatabase()
  },scheduleTime)
}

module.exports = scheduleJobForAccounts