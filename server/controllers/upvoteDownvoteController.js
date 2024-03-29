const models = require('../models/models');

const upvoteDownvoteController = {};

upvoteDownvoteController.toggleUpvoteDownvote = (req, res, next) => {
    try{
        const downvote = !req.body.upvote;
        if(downvote){
            res.locals.exposed = true;
        }
        // look for an existing upvote or downvote
        models.PostUpvoteDownvote.findOne({userId: req.cookies.ssid, postId: req.body.postId})
        .then((data)=>{
            // store the data for later
            res.locals.postUpvoteDownvoteInfo = data;
            if(!data){
                // if upvote/ downvote data for this post & user doesnt already exist, make a new one
                models.PostUpvoteDownvote.create({userId: req.cookies.ssid, postId: req.body.postId, 
                    upvoted: req.body.upvote, downvoted: downvote})
                .then(() => {
                    res.locals.isNew = true;
                    return next()
                })
            }
            // if it exists, update whether its an upvote or a downvote
            else{  
                let update = {};
                // if its an upvote
                if (req.body.upvote) {
                    if(data.upvoted) update = {upvoted: false, downvoted: false};
                    else update = {upvoted: true, downvoted: false};
                } 
                // if its a downvote
                else if (downvote) {
                    if(data.downvoted) update = {upvoted: false, downvoted: false};
                    else update = {upvoted: false, downvoted: true};
                }
                models.PostUpvoteDownvote.updateOne({_id: data._id}, {$set: update})
                .then(()=>{
                    return next();
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
        .then((data)=> {   
            res.locals.numUpvotes = 0;
            res.locals.numDownvotes = 0;
            for(const element of data){
                if(element.upvoted) res.locals.numUpvotes++;
                if(element.downvoted) res.locals.numDownvotes++;
            }
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
            if(data){
                res.locals.isUpvotedByUser = data.upvoted;
                res.locals.isDownvotedByUser = data.downvoted;
            }
            else {
                res.locals.isUpvotedByUser = false;
                res.locals.isDownvotedByUser = false;  
            }
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

upvoteDownvoteController.deleteAllUpvotesDownvotesFromPost = (req, res, next) => {
    try{
        models.PostUpvoteDownvote.deleteMany({postId: req.body.postId})
        .then(()=>{
            return next()
        })
    }
    catch {
        return next('Error deleting all upvotes / downvotes from a post')
    }
}

upvoteDownvoteController.deleteAllUpvotesDownvotesFromUser = async (req, res, next) => {
    try {
        const upvoteDownvoteRecords = await models.PostUpvoteDownvote.find({ userId: req.cookies.ssid });
        
        // Update the corresponding Post documents
        for (const record of upvoteDownvoteRecords) {
            if (record.upvoted) {
                await models.Post.findByIdAndUpdate(record.postId, { $inc: { upvotes: -1 } });
            }
            if (record.downvoted) {
                await models.Post.findByIdAndUpdate(record.postId, { $inc: { downvotes: -1 } });
            }
        }

        // Delete the upvote/downvote records
        await models.PostUpvoteDownvote.deleteMany({ userId: req.cookies.ssid });

        res.locals.status = 'All upvotes downvotes from user deleted';
        return next();
    } catch (error) {
        return next('Error deleting all upvotes / downvotes');
    }
};



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