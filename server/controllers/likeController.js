const models = require('../models/models');

const likeController = {};

likeController.toggleLike = (req, res, next) => {
    try{
        // look for the like
        models.PostLike.findOne({userId: req.cookies.ssid, postId: req.body.postId})
        .then((data)=>{
            // if it exists, delete it
            if(data){
                models.PostLike.deleteMany({userId: req.cookies.ssid, postId: req.body.postId})
                .then(() => {
                    return next();
                })
            }
            else{
                // if it doesnt, make it
                models.PostLike.create({userId: req.cookies.ssid, postId: req.body.postId})
                .then(() => {
                    return next()
                })
            }
        })
    } catch {
        return next('Error toggling like');
    }
}

likeController.getAllLikesFromPost = (req, res, next) => {
    try{
        models.PostLike.find({postId: `${req.body.postId}`})
        .then((data)=>{            
            res.locals.numLikes = data.length;
            return next();
        })
    }
    catch {
        return next('Error getting all likes from post')
    }
}

likeController.checkIfUserLikedPost = (req, res, next) => {
    try{
        models.PostLike.findOne({postId: `${req.body.postId}`, userId: `${req.cookies.ssid}`})
        .then((data)=>{
            if(data) res.locals.isLikedByUser = true;
            return next()
        })
    }
    catch {
        return next('Error checking if user liked post')
    }
}

likeController.getAllLikes = (req, res, next) => {
    try{
        models.PostLike.find({})
        .then((data) => {
            res.locals = data;
            return next()
        })
    }
    catch {
        return next('Error getting all likes')
    }
}

likeController.deleteAllLikes = (req, res, next) => {
    try{
        models.PostLike.deleteMany({})
        .then((data)=>{
            res.locals.status = 'All likes deleted'
            return next()
        })
    }
    catch {
        return next('Error deleting all likes')
    }
}

module.exports = likeController;