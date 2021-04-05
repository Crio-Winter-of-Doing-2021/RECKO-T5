const router = require('express').Router()
const OAuthController = require('../controllers/oauth')
const {isUserLoggedIn} = require('../middleware/user')

router.get('/xero',isUserLoggedIn, OAuthController.XeroAuthorization)
router.get('/xero/callback',isUserLoggedIn, OAuthController.XeroCallbackHandler)
router.get('/quickbooks',isUserLoggedIn, OAuthController.QuickBooksAuthorization)
router.get('/quickbooks/callback',isUserLoggedIn, OAuthController.QuickBooksCallbackHandler)

module.exports = router