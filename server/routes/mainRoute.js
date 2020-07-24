
const router = require('express').Router()
const userController = require('../controller/usersController')

//leaderboard nampilin list nama -> get findall user
//daftarin user baru ==> post user


router.get('/', userController.getAll)
router.post('/', userController.addUser)

module.exports = router