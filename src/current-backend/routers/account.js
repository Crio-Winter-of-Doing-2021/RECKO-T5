const AccountController = require('../controllers/account')
const { isUserLoggedIn } = require('../middleware/user')
const router = require('express').Router()

router.route('/account')
      .get(AccountController.getAccounts)
      .post(AccountController.createAccount)

router.route('/v2/account')
      .get(isUserLoggedIn, AccountController.getAccountsV2)
      .post(isUserLoggedIn, AccountController.createAccount)

// pagination and all route testing remains.

module.exports = router