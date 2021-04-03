const AccountController = require('../controllers/account')
const router = require('express').Router()

router.route('/account')
      .get(AccountController.getAccounts)
      .post(AccountController.createAccount)

module.exports = router