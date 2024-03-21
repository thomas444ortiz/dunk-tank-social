// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const sessionController = require('../controllers/sessionController');
const commentController = require('../controllers/commentController');
const upvoteDownvoteController = require('../controllers/upvoteDownvoteController');

// create a new post
router.post('/createPost',
    sessionController.verifySession,
    postController.createPost,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// update the body of a specific post
router.patch('/updatePost',
    postController.updateBody,
    (req, res) => {
        return res.status(200).json({})
    }
)

// load posts for a user feed
router.post('/loadPosts',
    sessionController.verifySession,
    postController.loadPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// get data for one post
router.post('/getOnePost',
    sessionController.verifySession,
    postController.getOnePost,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// load all posts associated with a specific user
router.post('/loadPostsByUser',
    sessionController.verifySession,
    postController.loadPostsByUser,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)
// delete a single post
router.delete('/deletePost',
    sessionController.verifySession,
    postController.deletePost,
    commentController.deleteAllCommentsFromPost,
    upvoteDownvoteController.deleteAllUpvotesDownvotesFromPost,
    (req, res) => {
        return res.status(200).json(res.locals);
    } 
)

// get all posts associated with a specific user
router.get('/allPostsByUser',
    postController.getAllPostsByUser,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;