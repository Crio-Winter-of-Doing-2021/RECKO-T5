const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')
const Employee = require('../models/employee')

const updateEmployeeDatabase = (uid) => {
  try{
    const q_acc = QUICKBOOKS.getAllEmployees(uid)
    const x_acc = XERO.getAllEmployees(uid)
    return Promise.all([q_acc, x_acc]).then((async ([x,y]) => {
      const allEmployees = [...x, ...y]
      try{
        const saveEntries = await Employee.insertMany(allEmployees)
        // console.log(saveEntries)
      }catch(e){
        if(e.code === 11000){
          console.log("duplicate document")
        }else
          console.log(e)
      }
      console.log(allEmployees.length)
    }))
  }catch(e){
    console.log(e)
    throw e
  }
  
} 

// const scheduleJobForEmployee  = async (uid) => {
//   // 1 hr in milliseconds
//   console.log("saving employees to database every 4 hr for userId ", uid)
//   const scheduleTime =  4*60*60*1000
//   // initial call when server starts
//   await updateEmployeeDatabase(uid)
//   setInterval(()=>{
//     updateEmployeeDatabase(uid)
//   },scheduleTime)
// }

module.exports = updateEmployeeDatabase