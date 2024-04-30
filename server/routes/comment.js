const express = require('express');
const commentController = require('../controllers/commentController');
const sessionController = require('../controllers/sessionController')
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const router = express.Router();

// creates a new comment
router.post('/createComment', 
    sessionController.verifySession,
    postController.validatePost,
    userController.getUserInfo,
    commentController.createComment,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

// gets all comments from a specific post
router.post('/postComments', 
    commentController.loadComments,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

router.patch('/editComments',
    commentController.editComment,
    (req, res) => {
        return res.status(200).json({})
    }
)

// gets all coments associated with a specific user
router.get('/allOfUsersComments', 
    commentController.getAllOfUsersComments,
    (req, res) => {
        return res.status(200).json(res.locals)
    }
)

// deletes a specific comment
router.delete('/deleteComment',
    commentController.deleteComment,
    (req, res) =>{
        return res.status(200).json(res.locals);
    }
)

// export the router
module.exports = router;