const models = require('../models/models');
const utils = require('../../shared/utils')

const commentController = {};

commentController.createComment = (req, res, next) =>{
    try{
        models.Post.findOne({id: `${req.body.postId}`, userId: `${req.cookies.ssid}`})
        .then(()=>{
            models.Comment.create({body: `${req.body.commentBody}`, postId: `${req.body.postId}`, userId: `${req.cookies.ssid}`})
            .then((data)=>{
                return next();
            })
        })
    } catch {
        return next('Error creating comment')
    }
}

commentController.getAllCommentsFromPost = (req, res, next) => {
    try {
        models.Comment.find({postId: `${req.body.postId}`})
        .then((data)=>{
            res.locals = data;
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