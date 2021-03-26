require('dotenv').config()
const {setXeroTokenSet} = require('./token')
const xero = require('./init')
const xeroTenantId = process.env.XERO_TENANT_ID

const getAllEmployees = async () => {
  try {
    // GET ALL
    await setXeroTokenSet()
    const employeesGetResponse = await xero.accountingApi.getEmployees(xeroTenantId);
    const employees =  employeesGetResponse.body.employees.map((emp) => {
      return {
        eid : emp.employeeID,
        active : emp.status === "ACTIVE",
        firstName: emp.firstName,
        lastName : emp.lastName
      }
    })
    return employees
  } catch (e) {
    console.log(e)
    throw e
  }
}
const getAnEmployee = async (id) => {
  try {
    // GET ALL
    await setXeroTokenSet()
    const employeeGetResponse = await xero.accountingApi.getEmployee(xeroTenantId, id);
    return employeeGetResponse
  } catch (e) {
    console.log(e)
    throw e
  }
}
// const 
// all crud operations.

module.exports = {
  getAllEmployees,
  getAnEmployee
}