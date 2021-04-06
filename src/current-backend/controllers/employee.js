const Employee = require('../models/employee')

const queryEmployees = async (uid) => {
  try{
    const employees = await Employee.find({uid})
    return employees
  }catch(e){
    console.log(e)  
    throw e
  }
}



class EmployeeController{
  async getEmployees(req, res){
    try{
      const {user} = req 
      const employees = await queryEmployees(user._id)
      res.send(employees)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
 
}

module.exports = new EmployeeController()