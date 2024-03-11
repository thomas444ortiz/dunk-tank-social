const models = require('../models/models');
const utils = require('../../shared/utils')

const commentController = {};

commentController.createComment = (req, res, next) =>{
    try{
        models.Comment.create({body: `${req.body.commentBody}`, postId: `${req.body.postId}`, 
        userId: `${req.cookies.ssid}`, username: res.locals.username})
        .then(() => {
            return next();
        })
    } catch {
        return next('Error creating comment')
    }
}

commentController.getAllCommentsFromPost = (req, res, next) => {
    try {
        models.Comment.find({postId: `${req.body.postId}`})
        .then((data)=>{
            // Initialize an empty object to hold the modified comments
            const modifiedData = {};
            data.forEach(comment => {
                // Clone the comment object to avoid modifying the original data
                const clonedComment = { ...comment._doc }; // Assuming Mongoose documents, use ._doc to get a plain JS object
                // Compare the userId and set it to true or false
                clonedComment.userId = comment.userId == req.cookies.ssid;
                // Use the comment's _id as the key for the modifiedData object
                modifiedData[comment._id] = clonedComment;
            });
            res.locals = modifiedData;
            return next();
        })
    }
    catch {
        return next('Error getting all comments from post')
    }
}

commentController.getAllComments = (req, res, next) => {
    try {
        models.Comment.find({})
        .then((data) => {
            res.locals = data;
            return next()
        })
    }
    catch {
        return next('Error getting all comments')
    }
}

commentController.deleteComment = (req, res, next) => {
    try{
        models.Comment.findOneAndDelete({userId: req.cookies.ssid, _id: req.body.commentId})
        .then((data)=>{            
            return next();
        })
    }
    catch {
        return next('Error deleting comment');
    }
}

commentController.deleteAllComments = (req, res, next) => {
    try{
        models.Comment.deleteMany({})
        .then((data)=>{
            res.locals.status = 'All comments deleted'
            return next()
        })
    }
    catch {
        return next('Error deleting all comments')
    }
}

module.exports = commentController;