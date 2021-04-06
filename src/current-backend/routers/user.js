const UserController = require('../controllers/user')
const router = require('express').Router()
const {isUserLoggedIn} = require('../middleware/user')


router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/logout', UserController.logout)
router.get('/user', isUserLoggedIn,UserController.getCurrentUser)

module.exports = router