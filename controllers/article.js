module.exports = {createArticle, editArticle, deleteArticle};
const Article = require('../models/article.js');
const User = require('../models/user');

function createArticle(req, res, next) {
    Article.create(
        {
          title: req.body.title,
          subtitle: req.body.subtitle,
          description: req.body.description,
          'owner.user': req.body.owner,
          'category.enum': req.body.category
        },
        (error, article) => {
          if (error) {
            res.status(400).send('Unable to create article/ incorrect data')
          }
          User.update({id:req.body.owner}, {$inc: {numberOfArticles: 1}}); //to fix
          res.status(200).json(article);
        })
    
    
}

function editArticle (req, res, next){
  const id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err)
      return next(new Error('Article does not exist'));

    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.description = req.body.description;
    article.category.enum = req.body.category;
    article.updatedAt = Date.now();
    article.save((err) => {
        if (err)
            res.send(err);

        res.json(article);
    });
  });
}


function deleteArticle (req, res,next) {
  const id = req.params.id;
  Article.findByIdAndRemove(id ,  (err, user) => {
    if (err) {
      return next(new Error('User was not found'))
    }
    res.json('Successfully removed')
  })
}