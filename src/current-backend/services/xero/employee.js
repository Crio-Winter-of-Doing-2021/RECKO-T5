require('dotenv').config()
const {setXeroTokenSet} = require('./token')
const xero = require('./init')
const xeroTenantId = process.env.XERO_TENANT_ID

const getAllEmployees = async (uid) => {
  try {
    // GET ALL
    await setXeroTokenSet(uid)
    const tenants = await xero.updateTenants()
    const employeesGetResponse = await xero.accountingApi.getEmployees(tenants[0].tenantId);
    const employees =  employeesGetResponse.body.employees.map((emp) => {
      return {
        eid : emp.employeeID,
        active : emp.status === "ACTIVE",
        firstName: emp.firstName,
        lastName : emp.lastName,
        uid
      }
    })
    return employees
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  getAllEmployees
}