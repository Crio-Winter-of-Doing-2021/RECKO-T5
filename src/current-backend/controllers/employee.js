const Employee = require('../models/employee')
const XERO = require('../services/xero')
const QUICKBOOKS = require('../services/quickbooks')


const queryEmployees = async (params) => {
  try{
    const employees = await Employee.find(params)
    return employees
  }catch(e){
    console.log(e)  
    throw e
  }
}

const queryEmployeesV2 = async (uid) => {
  try{
    const xero_emp = XERO.getAllEmployees(uid)
    const quickbook_emp = QUICKBOOKS.getAllEmployees(uid)
    return Promise.all([xero_emp, quickbook_emp]).then((values) => {
      return {
        employees: [...values[0], ...values[1]] 
      }
    })
  }catch(e){
    console.log(e)  
    throw e
  }
}

class EmployeeController{
  async getEmployees(req, res){
    try{
      const {params} = req 
      const employees = await queryEmployees(params)
      res.send(employees)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
  async getEmployeesV2(req, res){
    try{
      const {user} = req 
      const employees = await queryEmployeesV2(user._id)
      res.send(employees)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e.message})
    }
  }
}

module.exports = new EmployeeController()