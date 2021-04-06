const EmployeeController = require('../controllers/employee')
const { isUserLoggedIn } = require('../middleware/user')
const ScheduleDataSaving = require('../middleware/scheduler')
const router = require('express').Router()

router.get('/employee',isUserLoggedIn,ScheduleDataSaving, EmployeeController.getEmployees)


module.exports = router