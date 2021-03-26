const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')
const Employee = require('../models/employee')

const updateEmployeeDatabase = () => {
  const q_acc = QUICKBOOKS.getAllEmployees()
  const x_acc = XERO.getAllEmployees()
  const accounts = Promise.all([q_acc, x_acc]).then((async ([x,y]) => {
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
} 

const scheduleJobForEmployee  = () => {
  // 1 hr in milliseconds
  console.log("saving employees to database every 1 hr")
  const scheduleTime =  60*60*1000
  // initial call when server starts
  updateEmployeeDatabase()
  setInterval(()=>{
    updateEmployeeDatabase()
  },scheduleTime)
}

module.exports = scheduleJobForEmployee