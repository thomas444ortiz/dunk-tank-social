const models = require('../models/models');
const utils = require('../../shared/utils');

const postController = {};

postController.createPost = (req, res, next) => {
    try {
        // make sure the post body is valid format
        if(!utils.isValidPostContent(req.body.body)) return next('Post body format invalid')
        // first get the username of the poster
        models.User.findOne({_id: `${req.cookies.ssid}`})
        .then((data) => {
            models.Post.create({body: `${req.body.body}`, userId: `${req.cookies.ssid}`, 
            username: `${data.username}`, isExposed: false, upvotes: 0, downvotes: 0})
            .then(()=> {
                return next();
            })
        })
    } catch {
        return next('Error creating post')
    }
}

postController.exposeUsername = (req, res, next) =>{
    try{
        if(res.locals.exposed){
        // find the post and see if its already exposed
        models.Post.findOne({_id: req.body.postId})
        .then((data)=> {
            // only update the status if the username is not already exposed
            if(!data.usernameExposed){
                models.Post.updateOne({_id: req.body.postId}, {$set: {usernameExposed: true}})
                .then((data)=>{
                    return next();
                })
            }
            else{
                res.locals.exposed = false;
                return next();
            }
        })
        }
        else{
            return next();
        }
    }
    catch{
        return next('Error exposing username');
    }
}

postController.updateUpvotesDownvotes = (req, res, next) => {
    try{
/*------ Note: because this middleware function runs after the one that changes the upvote/downvote
         status, all the logic of updting the numbers is reversed ------------*/
            // create an object
        let update = {upvotes: 1, downvotes: 1}
        // if a new post was created, just increment the upvote or downvote
        if(!res.locals.postUpvoteDownvoteInfo){
            if(req.body.upvote) update = {upvotes: 1, downvotes: 0}
            else update = {upvotes: 0, downvotes: 1}
        }
        else {
            // if its an upvote
            if(req.body.upvote){
                // if preexisting upvote
                if(res.locals.postUpvoteDownvoteInfo.upvoted) update = {upvotes: -1, downvotes: 0}
                // if preexisting downvote
                else if(res.locals.postUpvoteDownvoteInfo.downvoted) update = {upvotes: 1, downvotes: -1}
                // if neither
                else update = {upvotes: 1, downvotes: 0}
            }
            // if its a downvote
            else{
                // if preexisting upvote
                if(res.locals.postUpvoteDownvoteInfo.upvoted) update={upvotes: -1, downvotes: 1}
                // if preexisting downvote
                else if(res.locals.postUpvoteDownvoteInfo.downvoted) update={upvotes: 0, downvotes: -1}
                // if neither
                else update = {upvotes: 0, downvotes: 1}
            }
        }
        models.Post.updateOne({_id: req.body.postId}, {$inc: update})
        .then(()=>{
            return next();
        })
    } catch {
        return next('Error updating upvotes / downvotes')
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
        .populate({
            path: 'userId',
            select: 'profilePicture username _id'
        })
        .then((data)=> {
            // Initialize an empty object to hold the modified posts
            const modifiedData = {};

            data.forEach(post => {
                // Clone the post object to avoid modifying the original data
                const clonedPost = { ...post._doc }; // Assuming Mongoose documents, use ._doc to get a plain JS object
                // Compare the userId and set it to true or false
                clonedPost.userId = post.userId._id == req.cookies.ssid;
                if(!clonedPost.usernameExposed) clonedPost.username = 'Anonymous';
                else clonedPost.username = post.userId.username;
                clonedPost.profilePicture = post.userId.profilePicture;
                // decode timestamp
                clonedPost.updatedAt = utils.formatElapsedTime(clonedPost.updatedAt, new Date().toISOString())
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

postController.getAllPostsByUser = (req, res, next) => {
    try {
        models.Post.find({userId: req.cookies.ssid})
        .populate({
            path: 'userId',
            select: 'profilePicture username _id'
        })
        .then((data)=> {
            // Initialize an empty object to hold the modified posts
            const modifiedData = {};

            data.forEach(post => {
                // Clone the post object to avoid modifying the original data
                const clonedPost = { ...post._doc }; // Assuming Mongoose documents, use ._doc to get a plain JS object
                // Compare the userId and set it to true or false
                clonedPost.userId = post.userId._id == req.cookies.ssid;
                if(!clonedPost.usernameExposed) clonedPost.username = 'Anonymous';
                else clonedPost.username = post.userId.username;
                clonedPost.profilePicture = post.userId.profilePicture;
                // decode timestamp
                clonedPost.updatedAt = utils.formatElapsedTime(clonedPost.updatedAt, new Date().toISOString())
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
            return next();
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


       // let upvote;
        // let downvote;
        // // if its a new upvote downvote, just add to either
        // if(res.locals.isNew){
        //   if(req.body.upvote){
        //     upvote = 1;
        //     downvote = 0;
        //   }
        //   else{
        //     upvote = 0;
        //     downvote = 1;
        //   }
        // }
        // // if its not new, we can increment one and decrement the other
        // else {
        //     upvote = req.body.upvote? 1: -1;
        //     downvote = -1 * upvote;
        // }

        // models.Post.updateOne({_id: req.body.postId}, {$inc: {upvotes: upvote , downvotes: downvote}})
        // .then((data)=>{
        //     return next();
        // })