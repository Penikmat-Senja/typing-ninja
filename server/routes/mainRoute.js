const router = require('express').Router()


//leaderboard nampilin list nama -> get findall user
//daftarin user baru ==> post user


router.get('/home', (req, res) => {
  res.send("ini home nantinya")

})

router.get('/', (req, res) => {
  res.send("ini form pendaftaran nantinya")
})

module.exports = router