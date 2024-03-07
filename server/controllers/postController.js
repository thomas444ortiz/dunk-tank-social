const models = require('../models/models');

const postController = {};

postController.createPost = (req, res, next) => {
    try {
        models.Post.create({body: `${req.body.body}`, by: `${req.cookies.ssid}`})
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

// function to delete all posts 
postController.deleteAllPosts = (req, res, next) => {
    models.Post.deleteMany({})
    .then(()=> {
        res.locals.status = 'All Posts Dropped'
        return next();
    })
    .catch(err => next(err));
}

module.exports = postController;