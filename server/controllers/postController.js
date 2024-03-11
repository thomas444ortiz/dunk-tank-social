const models = require('../models/models');
const utils = require('../../shared/utils')

const postController = {};

postController.createPost = (req, res, next) => {
    try {
        // make sure the post body is valid format
        if(!utils.isValidPostContent(req.body.body)) return next('Post body format invalid')
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

postController.validatePost = (req, res, next) => {
    try {
        models.Post.findOne({_id: req.body.postId})
        .then(() => {
            return next();
        })
    }
    catch {
        return next('Unable to validate post');
    }
}

postController.getAllPosts = (req,res, next) => {
    try {
        models.Post.find()
        .then((data)=> {
            // Initialize an empty object to hold the modified posts
            const modifiedData = {};

            data.forEach(post => {
                // Clone the post object to avoid modifying the original data
                const clonedPost = { ...post._doc }; // Assuming Mongoose documents, use ._doc to get a plain JS object
                // Compare the userId and set it to true or false
                clonedPost.userId = post.userId == req.cookies.ssid;

                // Use the post's _id as the key for the modifiedData object
                modifiedData[post._id] = clonedPost;
            });

            res.locals = modifiedData;
            return next();
        })
        .catch(err => next(err));
    } catch {
        return next('Error getting all posts')
    }
}

postController.deletePost = (req, res, next) => {
    try {
        // first delete the post
        models.Post.findOneAndDelete({_id: `${req.body.postId}`, userId: req.cookies.ssid})
        .then(()=> {
            // then delete the comments
            models.Comment.deleteMany({postID: `${req.body.postId}`})
            .then(()=>{
                //then delete the likes
                models.PostLike.deleteMany({postId: `${req.body.postId}`})
                .then(()=>{
                    return next();
                })
            })
        })
    } catch {
        return next('Error deleting post')
    }
}

postController.deleteAllPostsByUser = (req, res, next) => {
    try{
        models.Post.deleteMany({userId: `${req.cookies.ssid}`})
        .then((data)=>{
            return next()
        })
    } catch {
        return next('Error deleting all of users posts');
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