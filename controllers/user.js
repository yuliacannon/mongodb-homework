module.exports = {createUser, showUser, editUser, deleteUser, showArticles};
const User = require('../models/user.js');
const Article = require('../models/article.js');

function createUser(req, res, next) {
  User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        createdAt: req.body.time,
        numberOfArticles: req.body.number,
        nicknamme: req.body.nick

      },
      (error, user) => {
        if (error) {
          res.status(400).send('Unable to create user')
        }
        res.status(200).json(user)
      }
    )
  
}

function showUser(req, res, next) {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      return next(new Error(err))
    }
    // Article.find({'user.owner':id}, (err, article)=>{
    //   if(err){
    //     return next(new Error(err))
    //   }
    // })
    res.json(user)
  })
  
}

function editUser(req, res, next) {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err)
      res.send(err);

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.save((err) => {
        if (err)
            res.send(err);

        res.json(user);
    });
  });
}

function deleteUser(req, res, next) {
  const id = req.params.id;
  User.findByIdAndRemove(id ,  (err, user) => {
    if (err) {
      return next(new Error('User was not found'))
    }
    res.json('Successfully removed')
  })
}

function showArticles (req, res, next) { 
  const id = req.params.id;
  User.findById(id )
  .populate('owner.user')
  .exec(  (err, article) => {
    if (err) {
      return next(new Error('User was not found'))
    }
    res.json(article)
  })
}