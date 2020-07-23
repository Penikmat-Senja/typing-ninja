const { User } = require('../models')

class UserController{
  
  static getAll (eq,res){
    User.findAll({
      order: [
        ['score', 'DESC']
      ],
      limit: 5
    })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  static addUser(req,res){
    let newUser = {
      name: req.body.name,
      score: req.body.score
    }
    User.create(newUser)
    .then((data) => {
      return res.status(201).json(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

module.exports = UserController