const AccountController = require('../controllers/account')
const router = require('express').Router()

router.get('/account', AccountController.getAccounts)


module.exports = router