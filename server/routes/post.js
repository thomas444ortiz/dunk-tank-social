// require in Express, router, and controllers
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const sessionController = require('../controllers/sessionController');
const commentController = require('../controllers/commentController');
const upvoteDownvoteController = require('../controllers/upvoteDownvoteController');

router.post('/createPost',
    sessionController.verifySession,
    postController.createPost,
    (req, res) => {
        return res.status(200).json({});
    }
)

router.patch('/updatePost',
    postController.updateBody,
    (req, res) => {
        return res.status(200).json({})
    }
)

router.post('/loadPosts',
    sessionController.verifySession,
    postController.loadPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.post('/loadPostsByUser',
    sessionController.verifySession,
    postController.loadPostsByUser,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.delete('/deletePost',
    sessionController.verifySession,
    postController.deletePost,
    commentController.deleteAllCommentsFromPost,
    upvoteDownvoteController.deleteAllUpvotesDownvotesFromPost,
    (req, res) => {
        return res.status(200).json({})
    }
)

router.get('/allPostsByUser',
    postController.getAllPostsByUser,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

router.get('/allPosts',
    postController.getAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

router.delete('/allPosts',
    postController.deleteAllPosts,
    (req, res) => {
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;