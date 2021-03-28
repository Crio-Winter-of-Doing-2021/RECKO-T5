const UserController = require('../controllers/user')
const router = require('express').Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/logout', UserController.logout)
router.get('/user', UserController.GetAllUsers)

module.exports = router