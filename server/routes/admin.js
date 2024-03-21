// require in Express, router, and controllers
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const commentController = require('../controllers/commentController')
const postController = require('../controllers/postController')
const upvoteDownvoteController = require('../controllers/upvoteDownvoteController')

// get all users
router.get('/allUsers',
    userController.getAllUsers,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// delete all users
router.delete('/allUsers',
    userController.deleteAllUsers,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// get all posts
router.get('/allPosts',
    postController.getAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// delete all posts 
router.delete('/allPosts',
    postController.deleteAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// Gets all comments
router.get('/allComments', 
    commentController.getAllComments,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

// deletes all comments
router.delete('/allComments', 
    commentController.deleteAllComments,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

// gets all upvotes and downvotes
router.get('/allUpvotesDownvotes',
    upvoteDownvoteController.getAllUpvotesDownvotes,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// deletes all upvotes and downvotes
router.delete('/allUpvotesDownvotes',
    upvoteDownvoteController.deleteAllUpvotesDownvotes,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;