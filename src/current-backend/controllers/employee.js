const Employee = require('../models/employee')

const queryEmployees = async (params) => {
  try{
    const employees = await Employee.find(params)
    return employees
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
}

module.exports = new EmployeeController()