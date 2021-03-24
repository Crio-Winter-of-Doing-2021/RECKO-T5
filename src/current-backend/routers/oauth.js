const router = require('express').Router()
const OAuthController = require('../controllers/oauth')

router.get('/xero', OAuthController.XeroAuthorization)
router.get('/xero/callback', OAuthController.XeroCallbackHandler)
router.get('/quickbooks', OAuthController.QuickBooksAuthorization)
router.get('/quickbooks/callback', OAuthController.QuickBooksCallbackHandler)

module.exports = router