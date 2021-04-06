const AccountController = require('../controllers/account')
const { isUserLoggedIn } = require('../middleware/user')
const ScheduleDataSaving = require('../middleware/scheduler')
const router = require('express').Router()

router.route('/account')
      .get(isUserLoggedIn,ScheduleDataSaving,AccountController.getAccounts)
      .post(isUserLoggedIn,AccountController.createAccount)


module.exports = router