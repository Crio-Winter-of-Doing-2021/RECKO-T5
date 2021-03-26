const EmployeeController = require('../controllers/employee')
const router = require('express').Router()

router.get('/employee', EmployeeController.getEmployees)


module.exports = router