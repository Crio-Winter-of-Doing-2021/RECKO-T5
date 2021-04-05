const EmployeeController = require('../controllers/employee')
const { isUserLoggedIn } = require('../middleware/user')
const router = require('express').Router()

router.get('/employee', EmployeeController.getEmployees)
router.get('/v2/employee', isUserLoggedIn ,EmployeeController.getEmployeesV2)


module.exports = router