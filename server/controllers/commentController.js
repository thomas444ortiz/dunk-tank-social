const models = require('../models/models');
const utils = require('../utils')

const commentController = {};
 
commentController.createComment = (req, res, next) => {
    try {
        if (!utils.isValidPostContent(req.body.commentBody)) return next('Invalid comment format');
        models.Comment.create({
            body: `${req.body.commentBody}`,
            postId: `${req.body.postId}`,
            userId: `${req.cookies.ssid}`
        })
        .then((comment) => {
            return models.Comment.findById(comment._id)
                .populate('userId', 'username profilePicture') 
        })
        .then((populatedComment) => {
            let newData = {...populatedComment._doc};
            newData.username = populatedComment.userId.username;
            newData.profilePicture = populatedComment.userId.profilePicture;
            newData.userId = true;
            res.locals = newData;
            return next();
        });
    } catch (error) {
        return next('Error creating comment');
    }
};


commentController.loadComments = (req, res, next) => {
    try {
        // Extract the page number from the request. Default to page 1 if not specified.
        const page = parseInt(req.body.page) || 1;
        const postsPerPage = 2;
        
        // Calculate the number of posts to skip based on the page number
        const skip = (page - 1) * postsPerPage;

        models.Comment.find({postId: `${req.body.postId}`})
        .populate({
            path: 'userId',
            select: 'profilePicture username _id'
        })
        .sort({createdAt: -1}) // Sort in descending order of creation
        .skip(skip) // Skip posts based on the current page
        .limit(postsPerPage) // Limit the number of posts
        .then((data)=>{
            // Initialize an empty object to hold the modified comments
            const modifiedData = {};
            data.forEach(comment => {
                // Clone the comment object to avoid modifying the original data
                const clonedComment = { ...comment._doc }; // Assuming Mongoose documents, use ._doc to get a plain JS object
                // get the username and pro pic
                clonedComment.username = clonedComment.userId.username;
                clonedComment.profilePicture = clonedComment.userId.profilePicture;
                // Compare the userId and set it to true or false
                clonedComment.userId = comment.userId._id == req.cookies.ssid;
                // Use the comment's _id as the key for the modifiedData object
                modifiedData[comment._id] = clonedComment;
            });
            res.locals = Object.values(modifiedData);
            return next();
        })
    }
    catch {
        return next('Error getting all comments from post')
    }
}




commentController.getAllOfUsersComments = (req, res, next) => {
    try {
        models.Comment.find({userId: req.cookies.ssid})
        .populate({
            path: 'userId',
            select: 'profilePicture username _id'
        })
        .then((data) => {
            res.locals = data;
            return next()
        })
    }
    catch {
        return next('Error getting all comments')
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
        .then(()=>{            
            return next();
        })
    }
    catch {
        return next('Error deleting comment');
    }
}

commentController.deleteAllCommentsFromPost = (req, res, next) => {
    try{
        models.Comment.deleteMany({postId: req.body.postId})
        .then(()=>{
            return next()
        })
    }
    catch {
        return next('Error deleting all comments from post')
    }
}

commentController.deleteAllCommentsByUser = (req, res, next) => {
    try{
        models.Comment.deleteMany({userId: req.cookies.ssid})
        .then(()=>{
            res.locals.status = 'All comments deleted'
            return next()
        })
    }
    catch {
        return next('Error deleting all comments')
    }
}

commentController.deleteAllComments = (req, res, next) => {
    try{
        models.Comment.deleteMany({})
        .then(()=>{
            res.locals.status = 'All comments deleted'
            return next()
        })
    }
    catch {
        return next('Error deleting all comments')
    }
}

module.exports = commentController;