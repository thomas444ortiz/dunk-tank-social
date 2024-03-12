const models = require('../models/models');

const upvoteDownvoteController = {};

upvoteDownvoteController.toggleUpvoteDownvote = (req, res, next) => {
    try{
        // look for the upvoteDownvote
        models.PostUpvoteDownvote.findOne({userId: req.cookies.ssid, postId: req.body.postId})
        .then((data)=>{
            // if it exists, delete it
            if(data){
                models.PostUpvoteDownvote.deleteMany({userId: req.cookies.ssid, postId: req.body.postId})
                .then(() => {
                    return next();
                })
            }
            else{
                // if it doesnt, make it
                models.PostUpvoteDownvote.create({userId: req.cookies.ssid, postId: req.body.postId})
                .then(() => {
                    return next()
                })
            }
        })
    } catch {
        return next('Error toggling Upvote / Downvote');
    }
}

upvoteDownvoteController.getAllUpvotesDownvotesFromPost = (req, res, next) => {
    try{
        models.PostUpvoteDownvote.find({postId: `${req.body.postId}`})
        .then((data)=>{            
            res.locals.numUpvotes = data.length;
            res.locals.numDownvotes = data.length
            return next();
        })
    }
    catch {
        return next('Error getting all upvotes from post')
    }
}

upvoteDownvoteController.checkIfUserUpvotedDownvotedPost = (req, res, next) => {
    try{
        models.PostUpvoteDownvote.findOne({postId: `${req.body.postId}`, userId: `${req.cookies.ssid}`})
        .then((data)=>{
            res.locals.isUpvotedByUser = true;
            res.locals.isDownvotedByUser = false;
            return next()
        })
    }
    catch {
        return next('Error checking if user upvoted / downvoted post')
    }
}

upvoteDownvoteController.getAllUpvotesDownvotes = (req, res, next) => {
    try{
        models.PostUpvoteDownvote.find({})
        .then((data) => {
            res.locals = data;
            return next()
        })
    }
    catch {
        return next('Error getting all upvotes downvotes')
    }
}

upvoteDownvoteController.deleteAllUpvotesDownvotes = (req, res, next) => {
    try{
        models.PostUpvoteDownvote.deleteMany({})
        .then((data)=>{
            res.locals.status = 'All upvotes downvotes deleted'
            return next()
        })
    }
    catch {
        return next('Error deleting all upvotes / downvotes')
    }
}

module.exports = upvoteDownvoteController;