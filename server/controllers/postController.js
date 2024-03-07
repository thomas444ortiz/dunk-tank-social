const models = require('../models/models');

const postController = {};

postController.createPost = (req, res, next) => {
    try {
        console.log('create post invoked')
        models.Post.create({body: `${req.body.body}`})
        .then(()=> {
            return next();
        })
    } catch {
        return next('Error creating post')
    }
}

postController.getAllPosts = (req,res, next) => {
    try {
        models.Post.find()
        .then((data)=> {
            res.locals = data;
            return next();
        })
        .catch(err => next(err));
    } catch {
        return next('Error getting all posts')
    }
}

module.exports = postController;