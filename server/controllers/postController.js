const models = require('../models/models');

const postController = {};

postController.createPost = (req, res, next) => {
    try {
        // first get the username of the poster
        models.User.findOne({_id: `${req.cookies.ssid}`})
        .then((data) => {
            models.Post.create({body: `${req.body.body}`, userId: `${req.cookies.ssid}`, username: `${data.username}`})
            .then(()=> {
                return next();
            })
        })
    } catch {
        return next('Error creating post')
    }
}

postController.deletePost = (req, res, next) => {
    try {
        // first make sure the user is the user who created that post
        models.Post.findOne({_id: `${req.body.postId}`, userId: `${req.cookies.ssid}`})
        .then((data)=> {
            // if the post id matches the user id of the person who posted, delete it
            if(data!== null){
                models.Post.findOneAndDelete({_id: `${req.body.postId}`})
                .then(()=> {
                    return next();
                })
            }
            else{
                return next('Not authorized to delete that post')
            }
        })
    } catch {
        return next('Error deleting post')
    }
}

postController.getAllPosts = (req,res, next) => {
    try {
        models.Post.find()
        .then((data)=> {
            // remove the userids before sending back to frontend
            for(const post of data){
                post.userId = null;
            }
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